import { useContext, useEffect, useState } from 'react';
import { prettyJSON } from '../../../../helpers';
import { SessionCtx } from '../../../../library/Context/SessionContext';
import useFetch from '../../../../library/hooks/fetch';
import Loader from '../../../../library/Loader';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';
import BuildingForm from '../New/Form';

const UpdateBuilding = ({ building_id }: { building_id: string }) => {
	const { refetchCtx } = useContext(SessionCtx);

	const { data: APIResponse, loading } = useFetch('/setup/building/find', {
		params: {
			id: building_id,
		},
	});

	const [data, setData] = useState({});

	useEffect(() => {
		if (!loading) setData(APIResponse);
	}, [loading]);

	const handleSubmit = async () => {
		try {
			const response = await request.post('/setup/building/update', data);
			handleSuccessToast(response);
			refetchCtx();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	if (loading) return <Loader />;

	return (
		<BuildingForm
			{...{
				formTitle: 'Update Building',
				ctaName: 'Update',
				data,
				setData,
				handleSubmit,
			}}
		/>
	);
};

export default UpdateBuilding;
