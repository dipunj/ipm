import { useRouter } from 'next/router';
import { useContext } from 'react';
import { BuildingCtx } from '../../../../library/Context/BuildingContext';
import useFetch from '../../../../library/hooks/fetch';
import Loader from '../../../../library/Loader';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';
import Card, { HeaderCard } from './Card';

const ListAllBuildings = () => {
	const router = useRouter();
	const { data, loading, refetch } = useFetch('/setup/building/list');

	const {
		ctx: { id: current_building_id },
	}: any = useContext(BuildingCtx);

	if (loading) {
		return (
			<div className="page-content">
				<div className="page-title">All Buildings</div>
				<Loader />
			</div>
		);
	}

	const handleDelete = async (building_id: string) => {
		try {
			const response = await request.post('/setup/building/delete', {
				id: building_id,
			});
			handleSuccessToast(response);
			refetch();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const handleEdit = (building_id: string) => {
		router.push('/building/edit/[building_id]', `/building/edit/${building_id}`);
	};

	const cards = data.buildings.map((building: any) => (
		<Card
			key={building.id}
			{...{
				buildingData: building,
				handleDelete,
				handleEdit,
				isDeletable: building.id !== current_building_id,
			}}
		/>
	));

	return (
		<div className="page-content">
			<div className="page-title">All Buildings</div>
			<HeaderCard />
			{cards}
		</div>
	);
};

export default ListAllBuildings;
