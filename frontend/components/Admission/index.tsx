import { useReducer, Dispatch } from 'react';
import { useRouter } from 'next/router';
import AdmissionForm from './Form';
import request from '../../library/Request';

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
	comments: '',
	purpose: '',
	doctor_name: '',
};

const reducer = (state: any, action: any) => {
	const { fieldName, newValue } = action;
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

		const response = await request.post('/management/admission/new', { ...params });
		if (response.data.success && response.data.is_authenticated) {
			// TODO: show toast here
			router.push('/');
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
