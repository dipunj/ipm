import { useContext, useState } from 'react';
import { SessionCtx } from '../../../../library/Context/SessionContext';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';
import BuildingForm from './Form';

const initialState = {
	branch_code: '',
	name_line: '',
	address_line: '',
	locality: '',
	city: '',
	administrative_area: '',
	postal_code: '',
	country: '',
};

const NewBuilding = (): JSX.Element => {
	const { refetchCtx }: any = useContext(SessionCtx);
	const [data, setData] = useState(initialState);
	const handleSubmit = async () => {
		try {
			const response = await request.post('/setup/building/create', data);
			handleSuccessToast(response);
			refetchCtx();
		} catch (error) {
			handleErrorToast(error);
		}
	};
	return (
		<BuildingForm
			{...{
				data,
				setData,
				handleSubmit,
			}}
		/>
	);
};

export default NewBuilding;
