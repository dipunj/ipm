import { useReducer, Dispatch } from 'react';
import { useRouter } from 'next/router';
import AdmissionForm from '../Form';
import request from '../../../library/Request';

const reducer = (state: any, action: any) => {
	const { fieldName, newValue } = action;
	return {
		...state,
		[fieldName]: newValue,
	};
};

const EditExistingAdmission = ({ data }): JSX.Element => {
	const router = useRouter();

	const [state, dispatch]: [any, Dispatch<any>] = useReducer(reducer, {
		name: data.patient.name,
		phone: data.patient.phone,
		age: new Date().getFullYear() - data.patient.yob,
		gender: data.patient.gender,
		guardian_name: data.guardian_name,
		guardian_phone: data.guardian_phone,
		ward: data.bed.ward,
		bed: data.bed,
		admit_timestamp: new Date(data.admit_timestamp),
		discharge_timestamp: data.discharge_timestamp ? new Date(data.discharge_timestamp) : null,
		comments: data.comments,
		purpose: data.purpose,
		doctor_name: data.doctor_name,
	});

	const makeAPICall = async (state: any) => {
		const { ward, bed, ...params } = state;
		params.bed_id = bed.id;

		const response = await request.post('/management/admission/update', { ...params });
		if (response.data.success && response.data.is_authenticated) {
			// TODO: show toast here
			router.push('/');
		}
	};

	return <AdmissionForm {...{ ctaText: 'Update', state, dispatch, makeAPICall }} />;
};

export default EditExistingAdmission;
