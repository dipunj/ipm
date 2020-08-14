import { InputGroup, FormGroup, Button } from '@blueprintjs/core';
import { FormEvent, useState } from 'react';
import GenderSelect from '../../../library/Select/Gender';

type State = {
	name: string;
	phone: string;
	age: number;
	gender: Gender;
	guardian_name: string;
	guardian_phone: string;
	ward_id: string;
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
	ward_id: 'none',
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
	ward_id: false,
	bed_id: false,
	admit_timestamp: false,
	discharge_timestamp: false,
	comments: true,
	purpose: true,
	doctor_name: true,
};

const AdmissionForm = (props: IAdmissionForm): JSX.Element => {
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

	return (
		<>
			<h1 className="page-title">New Admission</h1>
			<div className="page-content">
				<div className="column">
					<div className="row wrap full-width">
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
								placeholder="Patient Phone Number"
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
