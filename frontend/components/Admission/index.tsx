import { useReducer } from 'react';
import AdmissionForm from './Form';

const initialState = {
	name: '',
	phone: '',
	age: '',
	gender: 'female',
	guardian_name: '',
	guardian_phone: '',
	ward: '',
	bed: '',
	admit_timestamp: Date.now,
	discharge_timestamp: '',
	comments: '',
	purpose: '',
	doctor_name: '',
};

const reducer = (state, action) => {
	const { fieldName, newValue } = action;
	return {
		...state,
		[fieldName]: newValue,
	};
};

const NewAdmission = (): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const makeAPICall = (state) => {
		alert(state);
	};

	return <AdmissionForm {...{ state, dispatch, makeAPICall }} />;
};

export default NewAdmission;
