import { useState } from 'react';
import { Button, Alert, Popover, FormGroup, H4 } from '@blueprintjs/core';
import { DatePicker } from '@blueprintjs/datetime';
import { useRouter } from 'next/router';
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
import EditExistingAdmission from '../EditExisting';
import { handleErrorToast, handleSuccessToast } from '../../../library/Toaster';
import request from '../../../library/Request';
import { dateFormatOptions } from '../../../helpers';
import useFetch from '../../../library/hooks/fetch';
import ViewAdmissionSkeleton from './skeleton';
import DischargeConfirmation from '../DischargeConfirmation';

const ViewAdmission = ({ admission_id }: { admission_id: string }) => {
	// const {
	// 	success,
	// 	response: { message, data },
	// } = admissionAPIResponse;

	const router = useRouter();

	const { loading, data, refetch } = useFetch('/management/admission/find', {
		params: { admission_id },
	});

	const [showDischargeConfirmation, setShowDischargeConfirmation] = useState(false);
	const [showModify, setShowModify] = useState(false);
	const [actualDischargeTimeStamp, setActualDischargeTimeStamp] = useState(new Date());

	if (loading) {
		return <ViewAdmissionSkeleton />;
	}

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
		// updated_by: { name: updated_by, id: updated_by_id },
		patient: { name: patientName, yob: patientYob, gender: patientGender, phone: patientPhone },
		purpose,
		comment,
	} = data;

	const goToTransactions = () => {
		router.push('/transactions/[admission_id]', `/transactions/${admission_id}`);
	};

	const handleModify = () => {
		setShowModify((prev) => !prev);
	};

	const toggleDischargeConfirmation = () => {
		setActualDischargeTimeStamp(
			discharge_timestamp ? new Date(discharge_timestamp) : new Date()
		);
		setShowDischargeConfirmation((prev) => !prev);
	};

	const makeDischargeCall = async () => {
		try {
			const params = {
				admission_id: data.id,
				discharge_timestamp: actualDischargeTimeStamp,
				undo_discharge: is_discharged,
			};

			const response = await request.post('/management/admission/discharge', { ...params });
			if (response.data.success && response.data.is_authenticated) {
				setShowDischargeConfirmation(false);
				refetch();
				handleSuccessToast(response);
			}
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const location = `${floor === 0 ? 'G' : `L${floor}`} / ${wardName} / ${bedName}`;
	const patientAge = new Date().getFullYear() - patientYob;

	const parsedAdmitTime = new Date(admit_timestamp).toLocaleString('en-GB', dateFormatOptions);
	const parsedDischargeTime = discharge_timestamp
		? new Date(discharge_timestamp).toLocaleString('en-GB', dateFormatOptions)
		: '-';

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
					{!is_discharged && (
						<Button onClick={handleModify} minimal rightIcon="edit">
							Modify
						</Button>
					)}
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
							<Value>{guardian_name || '-'}</Value>
						</Item>
						<Item>
							<Label>Guardian Phone</Label>
							<Value>{guardian_phone || '-'}</Value>
						</Item>
					</DetailBlock>
				</Row>
				<Row>
					<DetailBlock>
						<Item>
							<Label>Admit Time</Label>
							<Value>{parsedAdmitTime || '-'}</Value>
						</Item>
						<Item>
							<Label>Expected Discharge Time</Label>
							<Value>{parsedDischargeTime || '-'}</Value>
						</Item>
					</DetailBlock>
					<DetailBlock>
						<Item>
							<Label>Doctor</Label>
							<Value noPadding>{doctor_name || '-'}</Value>
						</Item>
						<Item>
							<Label>Purpose</Label>
							<Value noPadding>{purpose || '-'}</Value>
						</Item>
						<Item>
							<Label>Comment</Label>
							<Value noPadding>{comment || '-'}</Value>
						</Item>
					</DetailBlock>
				</Row>
				<div className="row wrap space-between">
					<Button intent="primary" onClick={goToTransactions} fill={isMobile}>
						Transactions
					</Button>
					<Button
						intent={is_discharged ? 'warning' : 'success'}
						onClick={toggleDischargeConfirmation}
						fill={isMobile}
					>
						{is_discharged ? 'Reopen Admission' : 'Mark As Discharged'}
					</Button>
				</div>
			</div>
			{is_discharged ? (
				<Alert
					isOpen={showDischargeConfirmation}
					onCancel={toggleDischargeConfirmation}
					onConfirm={makeDischargeCall}
					cancelButtonText="Cancel"
					confirmButtonText="Reopen Admission"
					intent="danger"
					icon="confirm"
					style={{ minWidth: '36vw' }}
				>
					<H4>
						Admission can only be reopened if the associated bed is empty. <br />
						Ensure that the bed is empty. Proceed?
					</H4>
				</Alert>
			) : (
				<DischargeConfirmation
					admission_id={data.id}
					showAlert={showDischargeConfirmation}
					toggleAlert={toggleDischargeConfirmation}
					reopenAdmission={is_discharged}
					successCallback={refetch}
				/>
			)}
		</>
	);
};

export default ViewAdmission;
