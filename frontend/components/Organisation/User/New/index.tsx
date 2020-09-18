import { useState } from 'react';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';
import UserForm, { UserFormDataType } from './Form';

const initialData = {
	name: '',
	login_id: '',
	password: '',
	account_type: 'operator',
	buildings: [],
};

const NewUser = () => {
	const [data, setData]: [UserFormDataType, any] = useState(initialData);

	const handleTagRemove = (_tag: string, index: number) => {
		setData((prev: FormDataType) => {
			const newList = [...prev.buildings];
			newList.splice(index, 1);
			return { ...prev, buildings: newList };
		});
	};

	const handleClear = () => {
		setData((prev: FormDataType) => ({
			...prev,
			buildings: [],
		}));
	};

	const handleAPICall = async () => {
		const { buildings, ...rest } = data;
		try {
			const response = await request.post('/setup/user/create', {
				...rest,
				password_confirmation: rest.password,
				building_id_list: buildings.map((bld) => bld.id),
			});
			handleSuccessToast(response);
			setData(initialData);
		} catch (error) {
			handleErrorToast(error);
		}
	};

	return (
		<div className="page-content">
			<h1 className="page-title">New User</h1>
			<UserForm
				{...{
					data,
					setData,
					handleAPICall,
					handleClear,
					handleTagRemove,
				}}
			/>
		</div>
	);
};

export default NewUser;
