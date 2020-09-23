/* eslint-disable no-param-reassign */
import { Tree, ITreeNode, Icon } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useFetch from '../../../../library/hooks/fetch';
import Loader from '../../../../library/Loader';

const generateWardObj = (ward: IWard): ITreeNode => ({
	id: ward.id,
	icon: 'grid-view',
	label: ward.name,
	hasCaret: false,
	isExpanded: true,
	childNodes: ward.beds.map(
		(bed: IBed): ITreeNode => ({
			id: bed.id,
			icon: bed.is_occupied ? (
				<Icon icon="people" intent="danger" style={{ marginRight: '8px' }} />
			) : (
				<Icon icon="unlock" intent="success" style={{ marginRight: '8px' }} />
			),
			className: bed.occupied_by_admission_id && 'pointer',
			label: bed.name,
			nodeData: { admission_id: bed.occupied_by_admission_id, occupied_by: bed.occupied_by },
			// className: bed.is_occupied ? 'bp3-intent-danger' : 'bp3-intent-danger',
			// style: { color: bed.is_occupied ? 'red' : 'green' },
			secondaryLabel: bed.is_occupied ? (
				<div>
					<strong>Occupant: </strong>
					{bed.occupied_by.name} ({bed.occupied_by.phone})
				</div>
			) : null,
		})
	),
});

interface IBed {
	id: string;
	name: string;
	ward_id: string;
	is_occupied: boolean;
	occupied_by?: any;
	occupied_by_admission_id?: string;
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
	id: strig;
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
	const router = useRouter();

	const {
		loading,
		data,
	}: {
		loading: boolean | null;
		data?: IBuildingStructure;
	} = useFetch('/setup/building/structure', { params: { patient_data: true } });

	const [floorWiseData, setFloorWiseData]: [ITreeNode[], any] = useState([]);

	const toggleNode = (nodeData: ITreeNode) => {
		setFloorWiseData((prev: ITreeNode[]) => {
			const replica = [...prev];
			let done = false;

			// floors
			replica.forEach((node) => {
				if (node.id === nodeData.id) {
					node.isExpanded = !node.isExpanded;
					done = true;
				}
			});

			// wards
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

			// beds
			if (!done) {
				replica.forEach((ppNode) => {
					ppNode?.childNodes?.forEach((pNode) => {
						pNode?.childNodes?.forEach((node) => {
							if (node.id === nodeData.id) {
								if (nodeData.nodeData?.admission_id) {
									router.push(
										'/admission/[admission_id]',
										`/admission/${nodeData.nodeData.admission_id}`
									);
								}
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
				).sort((a, b) => b.id - a.id)
			);
		}
	}, [loading]);

	if (loading || !floorWiseData) return <Loader />;
	return (
		<div className="page-content">
			<h1 className="page-title">Building Explorer</h1>
			<div className="form-margin">
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
