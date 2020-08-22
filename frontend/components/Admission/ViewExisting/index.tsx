import { useState } from 'react';
import { Button, Drawer, Alert, Popover, FormGroup, H4 } from '@blueprintjs/core';
import { DatePicker } from '@blueprintjs/datetime';
import {
	Location,
	Label,
	HeaderRow,
	DetailBlock,
	Value,
	Row,
	Item,
	AlertContainer,
} from './styles';
import Transactions from './TransactionsTable';
import EditExistingAdmission from '../EditExisting';

interface ITransaction {
	id: string;
	is_credit: boolean;
	payment_mode: string;
	currency: string;
	value: string;
	is_settled: boolean;
	purpose: string;
	reverses_transaction_id: string;
	admission_id: string;
	created_by_id: string;
}

const ViewAdmission = ({ admissionAPIResponse }) => {
	const {
		success,
		response: { message, data },
	} = admissionAPIResponse;

	if (!data) return <div>Loading...</div>;

	const {
		bed: {
			name: bedName,
			ward: { name: wardName, floor },
		},
		guardian_name,
		guardian_phone,
		doctor_name,
		is_discharged,
		admit_timestamp,
		discharge_timestamp,
		created_by: { name: created_by, id: created_by_id },
		last_updated_by: { name: last_updated_by, id: last_updated_by_id },
		patient: { name: patientName, yob: patientYob, gender: patientGender, phone: patientPhone },
		transactionsœ,
		purpose,
		comment,
	} = data;

	const [showTransactions, setShowTransactions] = useState(false);
	const [showDischargeConfirmation, setShowDischargeConfirmation] = useState(false);
	const [showModify, setShowModify] = useState(false);

	const [actualDischargeTimeStamp, setActualDischargeTimeStamp] = useState(
		discharge_timestamp || new Date()
	);

	const toggleTransactions = () => {
		setShowTransactions((prev) => !prev);
	};

	const handleModify = () => {
		setShowModify((prev) => !prev);
	};

	const handleDateChange = (selectedDate: Date) => {
		setActualDischargeTimeStamp(selectedDate);
	};

	const toggleDischargeConfirmation = () => {
		setActualDischargeTimeStamp(discharge_timestamp || new Date());
		setShowDischargeConfirmation((prev) => !prev);
	};

	const makeDischargeCall = () => {
		alert('make api call');
	};

	const location = `${floor === 0 ? 'G' : `L${floor}`} / ${wardName} / ${bedName}`;
	const patientAge = new Date().getFullYear() - patientYob;
	const options = {
		// weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour12: true,
		hour: 'numeric',
		minute: 'numeric',
		// timeZoneName: 'long',
	};

	const parsedAdmitTime = new Date(admit_timestamp).toLocaleString('en-GB', options);
	const parsedDischargeTime = discharge_timestamp
		? new Date(discharge_timestamp).toLocaleString('en-GB', options)
		: '-';

	const transactions = data.transactions.map((txn) => txn);

	const isMobile = window.innerWidth < 500;

	if (showModify) {
		return (
			<div className="page-content">
				<HeaderRow>
					<div className="page-title" style={{ margin: 0 }}>
						Edit Admission
					</div>
					<Button onClick={handleModify} minimal rightIcon="cross">
						Cancel
					</Button>
				</HeaderRow>
				<EditExistingAdmission data={data} />
			</div>
		);
	}
	return (
		<>
			<div className="page-content">
				<HeaderRow>
					<Location>{location}</Location>
					<Button onClick={handleModify} minimal rightIcon="edit">
						Modify
					</Button>
				</HeaderRow>

				<Row>
					<DetailBlock>
						<Item>
							<Label>Patient Name</Label>
							<Value>
								{patientName} ({patientAge && `${patientAge}yr`} {patientGender})
							</Value>
						</Item>
						<Item>
							<Label>Patient Phone</Label>
							<Value>{patientPhone}</Value>
						</Item>
					</DetailBlock>
					<DetailBlock>
						<Item>
							<Label>Guardian Name</Label>
							<Value>{guardian_name}</Value>
						</Item>
						<Item>
							<Label>Guardian Phone</Label>
							<Value>{guardian_phone}</Value>
						</Item>
					</DetailBlock>
				</Row>
				<Row>
					<DetailBlock>
						<Item>
							<Label>Admit Time</Label>
							<Value>{parsedAdmitTime}</Value>
						</Item>
						<Item>
							<Label>Expected Discharge Time</Label>
							<Value>{parsedDischargeTime}</Value>
						</Item>
					</DetailBlock>
					<DetailBlock>
						<Item>
							<Label>Doctor</Label>
							<Value noPadding>{doctor_name}</Value>
						</Item>
						<Item>
							<Label>Purpose</Label>
							<Value noPadding>{purpose}</Value>
						</Item>
						<Item>
							<Label>Comment</Label>
							<Value noPadding>{comment}</Value>
						</Item>
					</DetailBlock>
				</Row>
				<div className="row wrap space-between">
					<Button intent="primary" onClick={toggleTransactions} fill={isMobile}>
						View Transactions
					</Button>
					<Button intent="success" onClick={toggleDischargeConfirmation} fill={isMobile}>
						Mark As Discharged
					</Button>
				</div>
			</div>

			<Drawer
				position="right"
				size={isMobile ? '100vw' : '80vw'}
				isOpen={showTransactions}
				onClose={toggleTransactions}
				title={`${location} (${patientName})`}
				className="custom-background"
			>
				<Transactions list={transactions} />
			</Drawer>
			<Alert
				isOpen={showDischargeConfirmation}
				onCancel={toggleDischargeConfirmation}
				onConfirm={makeDischargeCall}
				cancelButtonText="Cancel"
				confirmButtonText="Confirm Discharge"
				intent="danger"
				icon="confirm"
				style={{ minWidth: '36vw' }}
			>
				<H4>Are you sure? This action cannot be reversed!</H4>
				<AlertContainer>
					<FormGroup
						className="row align-center space-evenly full-width"
						label="Discharge Time:"
						labelFor="discharge-timestamp"
					>
						<Popover>
							<Button intent="none">
								{actualDischargeTimeStamp.toLocaleString('en-GB', options)}
							</Button>
							<DatePicker
								id="discharge-timestamp"
								canClearSelection={false}
								highlightCurrentDay
								value={actualDischargeTimeStamp}
								timePickerProps={{
									useAmPm: true,
									onChange: (time) => handleDateChange(time),
								}}
								onChange={(val, _) => handleDateChange(val)}
							/>
						</Popover>
					</FormGroup>
				</AlertContainer>
			</Alert>
		</>
	);
};

export default ViewAdmission;
