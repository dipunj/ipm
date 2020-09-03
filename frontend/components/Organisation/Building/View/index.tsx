/* eslint-disable no-param-reassign */
import { Tree, ITreeNode } from '@blueprintjs/core';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import useFetch from '../../../../library/hooks/fetch';
import Loader from '../../../../library/Loader';

const generateWardObj = (ward: IWard): ITreeNode => ({
	id: ward.id,
	icon: 'more',
	label: ward.name,
	hasCaret: false,
	isExpanded: false,
	childNodes: ward.beds.map(
		(bed: IBed): ITreeNode => ({
			id: bed.id,
			icon: 'more',
			label: bed.name,
			className: bed.is_occupied ? 'bp3-intent-danger' : 'bp3-intent-danger',
		})
	),
});

interface IBed {
	id: string;
	name: string;
	ward_id: string;
	is_occupied: boolean;
}

interface IWard {
	id: string;
	floor: string;
	ward_type: string;
	ward_number: string;
	name: string;
	building_id: string;
	beds: IBed[];
}

interface IBuildingStructure {
	id: string;
	branch_code: string;
	name_line: string;
	address_line: string;
	locality: string | null;
	city: string;
	administrative_area: string;
	postal_code: string;
	country: string;
	wards: IWard[];
}

const ViewBuildingStructure = () => {
	const { loading, data }: { loading: boolean | null; data?: IBuildingStructure } = useFetch(
		'/setup/building/structure'
	);

	const [floorWiseData, setFloorWiseData]: [ITreeNode[], any] = useState([]);

	const toggleNode = (nodeData: ITreeNode) => {
		setFloorWiseData((prev: ITreeNode[]) => {
			const replica = [...prev];
			let done = false;
			replica.forEach((node) => {
				if (node.id === nodeData.id) {
					node.isExpanded = !node.isExpanded;
					done = true;
				}
			});

			if (!done) {
				replica.forEach((pNode) => {
					pNode?.childNodes?.forEach((node) => {
						if (node.id === nodeData.id) {
							node.isExpanded = !node.isExpanded;
							done = true;
						}
					});
				});
			}

			if (!done) {
				replica.forEach((ppNode) => {
					ppNode?.childNodes?.forEach((pNode) => {
						pNode?.childNodes?.forEach((node) => {
							if (node.id === nodeData.id) {
								node.isExpanded = !node.isExpanded;
								done = true;
							}
						});
					});
				});
			}
			return replica;
		});
	};

	useEffect(() => {
		if (!loading && data) {
			setFloorWiseData(
				Object.values(
					data.wards.reduce((acc: { [key: string]: ITreeNode }, ward: IWard) => {
						// eslint-disable-next-line no-prototype-builtins
						if (acc.hasOwnProperty(ward.floor)) {
							acc[ward.floor].childNodes?.push({
								...generateWardObj(ward),
							});
						} else {
							acc[ward.floor] = {
								id: ward.floor,
								hasCaret: true,
								isExpanded: true,
								icon: 'office',
								label: ward.floor === '0' ? 'Ground Floor' : `Level ${ward.floor}`,
								childNodes: [generateWardObj(ward)],
							};
						}
						return acc;
					}, {})
				).reverse()
			);
		}
	}, [loading]);

	if (loading || !floorWiseData) return <Loader />;
	return (
		<div className="page-content">
			<h1 className="page-title">Building Explorer</h1>
			<div>
				<Tree
					contents={floorWiseData}
					onNodeCollapse={toggleNode}
					onNodeExpand={toggleNode}
					onNodeClick={toggleNode}
				/>
			</div>
		</div>
	);
};

export default ViewBuildingStructure;
