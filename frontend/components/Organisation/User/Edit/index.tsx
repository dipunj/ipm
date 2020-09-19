import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useFetch from '../../../../library/hooks/fetch';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';
import UserForm, { UserFormDataType } from '../New/Form';
import Loader from '../../../../library/Loader';
import { prettyJSON } from '../../../../helpers';

const initialData = {
	name: '',
	login_id: '',
	password: '',
	account_type: 'operator',
	buildings: [],
};

const EditUser = ({ user_id }: { user_id: string }) => {
	const router = useRouter();

	const [enablePasswordUpdate, setEnablePasswordUpdate] = useState(false);
	const [data, setData]: [UserFormDataType, any] = useState(null);
	const { data: apiResponse, loading } = useFetch('/setup/user/find', {
		params: { id: user_id },
	});

	useEffect(() => {
		if (!loading) setData(apiResponse);
	}, [loading]);

	const handleTagRemove = (_tag: string, index: number) => {
		setData((prev: UserFormDataType) => {
			const newList = [...prev.buildings];
			newList.splice(index, 1);
			return { ...prev, buildings: newList };
		});
	};

	const handleClear = () => {
		setData((prev: UserFormDataType) => ({
			...prev,
			buildings: [],
		}));
	};

	const handleAPICall = async () => {
		const { buildings, password, ...rest } = data;
		try {
			const params = enablePasswordUpdate
				? {
						...rest,
						password,
						password_confirmation: password,
						building_id_list: buildings.map((bld) => bld.id),
				  }
				: {
						...rest,
						building_id_list: buildings.map((bld) => bld.id),
				  };

			const response = await request.post('/setup/user/update', params);
			handleSuccessToast(response);
			router.back();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const togglePasswordUpdate = () => setEnablePasswordUpdate((prev) => !prev);
	if (!data)
		return (
			<div className="page-content">
				<Loader />
			</div>
		);

	return (
		<div className="page-content">
			<h1 className="page-title">Modify User ({apiResponse.name})</h1>
			<UserForm
				{...{
					ctaName: 'Update',
					data,
					setData,
					handleAPICall,
					handleClear,
					handleTagRemove,
					showPasswordToggle: true,
					enablePasswordUpdate,
					togglePasswordUpdate,
				}}
			/>
		</div>
	);
};

export default EditUser;
