import { InputGroup, FormGroup, Button, TextArea } from '@blueprintjs/core';
import { useState } from 'react';
import { DatePicker } from '@blueprintjs/datetime';
import GenderSelect from '../../../library/Select/Gender';
import WardSelect from '../../../library/Select/Ward';
import BedSelect from '../../../library/Select/Bed';
import { DetailBlock, BlockLabel } from './styles';
import styles from './form.module.css';
import { Gender } from '../../../common/types';

type State = {
	name: string;
	phone: string;
	age: number;
	gender: Gender;
	guardian_name: string;
	guardian_phone: string;
	ward: any;
	bed: any;
	admit_timestamp: Date;
	discharge_timestamp: Date;
	comments: string;
	purpose: string;
	doctor_name: string;
};

interface IAdmissionForm {
	state: State;
	ctaText: string | null;
	// sets the field "field" to value "value"
	dispatch: (action: { fieldName: string; newValue: string | Date }) => void;
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
	bed: 'none',
	admit_timestamp: 'none',
	discharge_timestamp: 'none',
	comments: 'none',
	purpose: 'none',
	doctor_name: 'none',
};

const nullable: any = {
	name: false,
	phone: false,
	age: false,
	gender: false,
	guardian_name: false,
	guardian_phone: false,
	ward: false,
	bed: false,
	admit_timestamp: false,
	discharge_timestamp: true,
	comments: true,
	purpose: true,
	doctor_name: true,
};

const AdmissionForm = (props: IAdmissionForm): JSX.Element => {
	const [intent, setIntent]: [any, any] = useState(initialIntent);
	const {
		state,
		dispatch,
		makeAPICall,
	}: { state: any; dispatch: any; makeAPICall: any; title: string } = props;

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {
			target: { value: newValue, name: fieldName },
		} = event;

		if (newValue && intent[fieldName] === 'danger')
			setIntent((prev: any) => ({ ...prev, [fieldName]: 'none' }));

		dispatch({ fieldName, newValue });
	};

	const handleSelectChange = (newValue: any, fieldName: string) => {
		if (newValue && intent[fieldName] === 'danger')
			setIntent((prev: any) => ({ ...prev, [fieldName]: 'none' }));

		dispatch({ fieldName, newValue });
	};

	const handleDateChange = (selectedDate: Date, _isUserChanged: boolean, fieldName: string) => {
		if (selectedDate && intent[fieldName] === 'danger')
			setIntent((prev: any) => ({ ...prev, [fieldName]: 'none' }));

		dispatch({ fieldName, newValue: selectedDate });
	};

	const formOK = () => {
		const newIntent = { ...intent };
		let properlyFilled = true;

		Object.keys(state).forEach((field: string) => {
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
			<div className="column full-width">
				<DetailBlock>
					<BlockLabel>Patient Details</BlockLabel>
					<div className="row wrap full-width">
						<FormGroup
							className={styles.halfColumn}
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
							className={styles.halfColumn}
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
					</div>

					<div className="row wrap full-width">
						<FormGroup
							className={styles.halfColumn}
							label="Gender"
							intent={intent.gender}
							labelFor="patient-gender"
							helperText={intent.gender === 'danger' && 'Required'}
							labelInfo="*"
						>
							<GenderSelect
								id="patient-gender"
								intent={intent.gender}
								name="gender"
								onItemSelect={(val, _) => handleSelectChange(val, 'gender')}
								activeItem={state.gender}
							/>
						</FormGroup>
						<FormGroup
							className={styles.halfColumn}
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
								intent={intent.age}
								placeholder="Patient's Age"
								value={state.age}
								onChange={handleTextChange}
							/>
						</FormGroup>
					</div>
				</DetailBlock>

				<DetailBlock>
					<BlockLabel>Guardian Details</BlockLabel>
					<div className="row wrap full-width">
						<FormGroup
							className={styles.halfColumn}
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
							className={styles.halfColumn}
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
								placeholder="Guardian's Phone Number"
								value={state.guardian_phone}
								onChange={handleTextChange}
							/>
						</FormGroup>
					</div>
				</DetailBlock>

				<DetailBlock>
					<BlockLabel>Admission Details</BlockLabel>
					<div className="row wrap full-width">
						<FormGroup
							className={styles.halfColumn}
							label="Ward"
							intent={intent.ward}
							labelFor="ward-select"
							labelInfo="*"
							helperText={intent.ward === 'danger' && 'Required'}
						>
							<WardSelect
								id="ward-select"
								name="ward"
								intent={intent.ward}
								activeItem={state.ward}
								onItemSelect={(val, _) => handleSelectChange(val, 'ward')}
							/>
						</FormGroup>
						<FormGroup
							className={styles.halfColumn}
							label="Bed"
							intent={intent.bed}
							labelFor="bed-select"
							labelInfo="*"
							helperText={intent.bed === 'danger' && 'Required'}
						>
							<BedSelect
								id="bed-select"
								name="bed"
								intent={intent.bed}
								wardIDs={state.ward ? [state.ward.id] : []}
								activeItem={state.bed}
								onItemSelect={(val, _) => handleSelectChange(val, 'bed')}
							/>
						</FormGroup>
					</div>
					<div className="row wrap full-width">
						<FormGroup
							className={styles.halfColumn}
							label="Admission Date & Time"
							intent={intent.admit_timestamp}
							labelFor="admit-timestamp"
							labelInfo="*"
							helperText={intent.admit_timestamp === 'danger' && 'Required'}
						>
							<DatePicker
								canClearSelection={false}
								className={styles.datepicker}
								highlightCurrentDay
								value={state.admit_timestamp}
								timePickerProps={{
									useAmPm: true,
									onChange: (time) =>
										handleDateChange(time, false, 'admit_timestamp'),
								}}
								onChange={(val, iuc) =>
									handleDateChange(val, iuc, 'admit_timestamp')
								}
							/>
						</FormGroup>
						<FormGroup
							className={styles.halfColumn}
							label="Expected Discharge Date"
							intent={intent.discharge_timestamp}
							labelFor="discharge_timestamp"
							helperText="(Can be updated later)"
						>
							<DatePicker
								className={styles.datepicker}
								highlightCurrentDay
								value={state.discharge_timestamp}
								onChange={(val, iuc) =>
									handleDateChange(val, iuc, 'discharge_timestamp')
								}
							/>
						</FormGroup>
					</div>
				</DetailBlock>
				<DetailBlock>
					<div className="row wrap full-width">
						<div className="column wrap half-width">
							<FormGroup
								className={styles.halfColumn}
								label="Comments"
								intent={intent.comments}
								labelFor="operator-comments"
							>
								<TextArea
									id="operator-comments"
									name="comments"
									fill
									// large
									rows={4}
									style={{ resize: 'vertical' }}
									intent={intent.comments}
									placeholder="Any note about the patient / Admission"
									value={state.comments}
									onChange={handleTextChange}
								/>
							</FormGroup>
						</div>
						<div className="column wrap half-width">
							<FormGroup
								className={styles.commentSibling}
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
								className={styles.commentSibling}
								label="Doctor Name"
								intent={intent.doctor_name}
								labelFor="doctor-name"
							>
								<InputGroup
									id="doctor-name"
									name="doctor_name"
									intent={intent.doctor_name}
									placeholder="Dr. Stephen Strange"
									value={state.doctor_name}
									onChange={handleTextChange}
								/>
							</FormGroup>
						</div>
					</div>
				</DetailBlock>
				<div className="row wrap center">
					<div className="quarter-width">
						<Button large fill intent="danger" type="submit" onClick={handleSubmit}>
							{props.ctaText || 'Submit'}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdmissionForm;
