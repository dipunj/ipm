import { useReducer, Dispatch } from 'react';
import AdmissionForm from './Form';

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
	const [state, dispatch]: [any, Dispatch<any>] = useReducer(reducer, initialState);
	const makeAPICall = (state: any) => {
		alert(state);
	};

	return <AdmissionForm {...{ state, dispatch, makeAPICall }} />;
};

export default NewAdmission;
