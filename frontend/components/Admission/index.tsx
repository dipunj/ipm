import { useReducer, Dispatch } from 'react';
import { useRouter } from 'next/router';
import AdmissionForm from './Form';
import request from '../../library/Request';
import { handleSuccessToast, handleErrorToast } from '../../library/Toaster';

const initialState = {
	name: '',
	phone: '',
	age: '',
	gender: '',
	guardian_name: '',
	guardian_phone: '',
	ward: null,
	bed: null,
	admit_timestamp: new Date(),
	discharge_timestamp: null,
	comment: '',
	purpose: '',
	doctor_name: '',
};

const reducer = (state: any, action: any) => {
	const { fieldName, newValue } = action;
	if (fieldName === 'ward') {
		return {
			...state,
			bed: null,
			[fieldName]: newValue,
		};
	}

	return {
		...state,
		[fieldName]: newValue,
	};
};

const NewAdmission = (): JSX.Element => {
	const router = useRouter();
	const [state, dispatch]: [any, Dispatch<any>] = useReducer(reducer, initialState);

	const makeAPICall = async (state: any) => {
		const { ward, bed, ...params } = state;
		params.bed_id = bed.id;

		try {
			const response = await request.post('/management/admission/new', { ...params });
			if (response.data.success && response.data.is_authenticated) {
				router.push('/admission/active');
				handleSuccessToast(response);
			}
		} catch (error) {
			handleErrorToast(error);
		}
	};

	return (
		<div className="page-content">
			<h1 className="page-title">New Admission</h1>
			<AdmissionForm {...{ state, dispatch, makeAPICall }} />
		</div>
	);
};

export default NewAdmission;
