import { InputGroup, FormGroup, Button, TextArea } from '@blueprintjs/core';
import { FormEvent, useState, useContext, useEffect } from 'react';
import GenderSelect from '../../../library/Select/Gender';
import { BuildingCtx } from '../../../library/Context/BuildingContext';
import { prettyJSON } from '../../../helpers';
import WardSelect from '../../../library/Select/Ward';

type State = {
	name: string;
	phone: string;
	age: number;
	gender: Gender;
	guardian_name: string;
	guardian_phone: string;
	ward: string;
	bed_id: string;
	admit_timestamp: Date;
	discharge_timestamp: Date;
	comments: string;
	purpose: string;
	doctor_name: string;
};

interface IAdmissionForm {
	state: State;
	// sets the field "field" to value "value"
	dispatch: (
		state: string | Gender | Date,
		action: { fieldName: string; newValue: string }
	) => void;
	makeAPICall: (state: State) => void;
}

const initialIntent = {
	name: 'none',
	phone: 'none',
	age: 'none',
	gender: 'none',
	guardian_name: 'none',
	guardian_phone: 'none',
	ward: 'none',
	bed_id: 'none',
	admit_timestamp: 'none',
	discharge_timestamp: 'none',
	comments: 'none',
	purpose: 'none',
	doctor_name: 'none',
};

const nullable = {
	name: false,
	phone: false,
	age: false,
	gender: false,
	guardian_name: false,
	guardian_phone: false,
	ward: false,
	bed_id: false,
	admit_timestamp: false,
	discharge_timestamp: false,
	comments: true,
	purpose: true,
	doctor_name: true,
};

const AdmissionForm = (props: IAdmissionForm): JSX.Element => {
	const { ctx } = useContext(BuildingCtx);
	const [intent, setIntent] = useState(initialIntent);
	const { state, dispatch, makeAPICall } = props;

	const handleTextChange = (event: FormEvent<HTMLEvent>) => {
		const {
			target: { value: newValue, name: fieldName },
		} = event;
		if (newValue && intent[fieldName] === 'danger')
			setIntent((prev) => ({ ...prev, [fieldName]: 'none' }));

		dispatch({ fieldName, newValue });
	};

	const handleSelectChange = (newValue, fieldName) => {
		if (newValue && intent[fieldName] === 'danger')
			setIntent((prev) => ({ ...prev, [fieldName]: 'none' }));

		dispatch({ fieldName, newValue });
	};

	const formOK = () => {
		const newIntent = { ...intent };
		let properlyFilled = true;

		Object.keys(state).forEach((field) => {
			if (!state[field] && !nullable[field]) {
				newIntent[field] = 'danger';
				properlyFilled = false;
			}
		});

		if (!properlyFilled) setIntent(newIntent);
		return properlyFilled;
	};

	const handleSubmit = () => {
		if (formOK()) makeAPICall(state);
	};

	useEffect(() => {
		console.log(state);
	}, [state]);
	return (
		<>
			<h1 className="page-title">New Admission</h1>
			<div className="page-content">
				<div className="column">
					<div className="column wrap full-width">
						<FormGroup
							label="Name"
							intent={intent.name}
							labelFor="patient-name"
							labelInfo="*"
							helperText={intent.name === 'danger' && 'Required'}
						>
							<InputGroup
								id="patient-name"
								intent={intent.name}
								name="name"
								type="text"
								placeholder="Patient Name"
								value={state.name}
								onChange={handleTextChange}
							/>
						</FormGroup>
						<FormGroup
							label="Phone Number"
							intent={intent.phone}
							labelFor="patient-phone"
							helperText={intent.phone === 'danger' && 'Required'}
							labelInfo="*"
						>
							<InputGroup
								id="patient-phone"
								name="phone"
								type="tel"
								intent={intent.phone}
								placeholder="Patient's Phone Number"
								value={state.phone}
								onChange={handleTextChange}
							/>
						</FormGroup>

						<FormGroup
							label="Gender"
							intent={intent.gender}
							labelFor="patient-gender"
							helperText={intent.phone === 'danger' && 'Required'}
							labelInfo="*"
						>
							<GenderSelect
								id="patient-gender"
								name="gender"
								onItemSelect={(val, _) => handleSelectChange(val, 'gender')}
								activeItem={state.gender}
							/>
						</FormGroup>
						<FormGroup
							label="Age"
							intent={intent.age}
							labelFor="patient-age"
							helperText={intent.age === 'danger' && 'Required'}
							labelInfo="*"
						>
							<InputGroup
								id="patient-age"
								name="age"
								type="number"
								min="0"
								placeholder="Patient's Age"
								value={state.age}
								onChange={handleTextChange}
							/>
						</FormGroup>

						<FormGroup
							label="Name"
							intent={intent.name}
							labelFor="guardian-name"
							labelInfo="*"
							helperText={intent.name === 'danger' && 'Required'}
						>
							<InputGroup
								id="guardian-name"
								intent={intent.guardian_name}
								name="guardian_name"
								type="text"
								placeholder="Guardian Name"
								value={state.guardian_name}
								onChange={handleTextChange}
							/>
						</FormGroup>
						<FormGroup
							label="Phone Number"
							intent={intent.guardian_phone}
							labelFor="guardian-phone"
							helperText={intent.guardian_phone === 'danger' && 'Required'}
							labelInfo="*"
						>
							<InputGroup
								id="guardian-phone"
								name="guardian_phone"
								type="tel"
								intent={intent.guardian_phone}
								placeholder="guardian's Phone Number"
								value={state.guardian_phone}
								onChange={handleTextChange}
							/>
						</FormGroup>

						<FormGroup
							label="Ward"
							intent={intent.ward}
							labelFor="ward-select"
							labelInfo="*"
							helperText={intent.ward === 'danger' && 'Required'}
						>
							<WardSelect
								id="ward-select"
								name="ward"
								activeItem={state.ward}
								onItemSelect={(val, _) => handleSelectChange(val, 'ward')}
							/>
						</FormGroup>

						<FormGroup
							label="Bed"
							intent={intent.bed_id}
							labelFor="bed_id"
							labelInfo="*"
							helperText={intent.bed_id === 'danger' && 'Required'}
						>
							bed select goes here
						</FormGroup>

						<FormGroup
							label="Admission Date & Time"
							intent={intent.admit_timestamp}
							labelFor="admit_timestamp"
							labelInfo="*"
							helperText={intent.admit_timestamp === 'danger' && 'Requierd'}
						>
							Admit Timestamp goes here
						</FormGroup>

						<FormGroup
							label="Expected Discharge Date"
							intent={intent.admit_timestamp}
							labelFor="discharge_timestamp"
						>
							Discharge Timestamp goes here
						</FormGroup>

						<FormGroup
							label="Comments"
							intent={intent.comments}
							labelFor="operator-comments"
						>
							<TextArea
								id="operator-comments"
								name="comments"
								type="textarea"
								intent={intent.comments}
								placeholder="Any note about the patient / Admission"
								value={state.comments}
								onChange={handleTextChange}
							/>
						</FormGroup>

						<FormGroup
							label="Purpose"
							intent={intent.purpose}
							labelFor="admission-purpose"
						>
							<InputGroup
								id="admission-purpose"
								name="purpose"
								intent={intent.purpose}
								placeholder="Delivery, Gall Bladder Removal ...etc"
								value={state.purpose}
								onChange={handleTextChange}
							/>
						</FormGroup>

						<FormGroup
							label="Doctor Name"
							intent={intent.doctor_name}
							labelFor="doctor-name"
						>
							Select for doctor name
						</FormGroup>
						<FormGroup>
							<Button type="submit" onClick={handleSubmit}>
								Submit
							</Button>
						</FormGroup>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdmissionForm;
