import { useEffect, useState } from 'react';
import { Button, Dialog, Drawer } from '@blueprintjs/core';
import { prettyJSON } from '../../../helpers';
import request from '../../../library/Request';
import { Location, Label, HeaderRow, DetailBlock, Value } from './styles';
import Transactions from './TransactionsTable';

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

	const [showTransactions, setShowTransactions] = useState(false);

	const toggleTransactions = () => {
		setShowTransactions((prev) => !prev);
	};
	const handleModify = () => {};

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
	} = data;

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
	return (
		<>
			<div className="page-content">
				<HeaderRow>
					<Location>{location}</Location>
					<Button onClick={handleModify} minimal rightIcon="edit">
						Modify Details
					</Button>
				</HeaderRow>

				<div className="row full-width space-between">
					<DetailBlock>
						<div className="row wrap align-center full-width">
							<Label>Patient Name</Label>
							<Value>
								{patientName} ({patientAge && `${patientAge}yr`} {patientGender})
							</Value>
						</div>
						<div className="row wrap align-center full-width">
							<Label>Patient Phone</Label>
							<Value>{patientPhone}</Value>
						</div>
					</DetailBlock>

					<DetailBlock>
						<div className="column wrap full-width">
							<Label>Admit Time</Label>
							<Value noPadding>{parsedAdmitTime}</Value>
						</div>
					</DetailBlock>
				</div>

				<div className="row full-width space-between">
					<DetailBlock>
						<div className="row wrap align-center full-width">
							<Label>Guardian Name</Label>
							<Value>{guardian_name}</Value>
						</div>
						<div className="row wrap align-center full-width">
							<Label>Guardian Phone</Label>
							<Value>{guardian_phone}</Value>
						</div>
					</DetailBlock>

					<DetailBlock>
						<div className="column wrap full-width">
							<Label>Expected Discharge Time</Label>
							<Value noPadding>{parsedDischargeTime}</Value>
						</div>
					</DetailBlock>
				</div>

				<div className="row full-width">
					<DetailBlock>
						<div className="column wrap full-width">
							<Label>Doctor</Label>
							<Value noPadding>{doctor_name}</Value>
						</div>
					</DetailBlock>
					<DetailBlock>
						<div className="column wrap full-width">
							<Label>Purpose</Label>
							<Value noPadding>{purpose}</Value>
						</div>
					</DetailBlock>
				</div>

				<div className="row space-between">
					<Button intent="primary" onClick={toggleTransactions}>
						View Transactions
					</Button>
					<Button intent="success">Mark As Discharged</Button>
				</div>
			</div>
			<Drawer
				position="right"
				size="80vw"
				isOpen={showTransactions}
				onClose={toggleTransactions}
				title={`${location} (${patientName})`}
			>
				<Transactions list={transactions} />
			</Drawer>
		</>
	);
};

export default ViewAdmission;
