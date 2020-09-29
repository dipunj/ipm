import { useContext, useState } from 'react';
import { Button, Alert, H4 } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import EditExistingAdmission from '../EditExisting';
import { handleErrorToast, handleSuccessToast } from '../../../library/Toaster';
import request from '../../../library/Request';
import useFetch from '../../../library/hooks/fetch';
import ViewAdmissionSkeleton from './skeleton';
import DischargeConfirmation from '../DischargeConfirmation';
import { layoutWithoutBuildingToggle } from '../../../library/Layout';
import { SessionCtx } from '../../../library/Context/SessionContext';
import { HeaderRow } from './styles';
import AdmissionDetailCard from './Card';

const ViewAdmission = ({ admission_id }: { admission_id: string }) => {
	// const {
	// 	success,
	// 	response: { message, data },
	// } = admissionAPIResponse;

	const {
		ctx: { account_type },
	}: any = useContext(SessionCtx);

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

	const { is_discharged, discharge_timestamp } = data;

	const goToTransactions = () => {
		router.push(
			'/admission/[admission_id]/transactions',
			`/admission/${admission_id}/transactions`
		);
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

	const redirectToLogs = () =>
		router.push('/logs/admission/[admission_id]', `/logs/admission/${admission_id}`);

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
				<AdmissionDetailCard {...{ data, handleModify }} />
				<div className="row wrap space-between">
					<Button intent="primary" onClick={goToTransactions} fill={isMobile}>
						Transactions
					</Button>
					{account_type !== 'operator' && (
						<Button onClick={redirectToLogs} outlined>
							Change Logs
						</Button>
					)}
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

ViewAdmission.getLayout = layoutWithoutBuildingToggle;

export default ViewAdmission;
