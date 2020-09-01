import { Colors, Icon, Popover, Position, Tooltip, Button } from '@blueprintjs/core';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { withCurrency, prettyJSON } from '../../../helpers';
import { IAdmissionData } from '../../Admission/EditExisting';
import { Container, Location, Wrapper, FieldName, MoneyValue, ButtonContainer } from './styles';
import DischargeConfirmation from '../../Admission/DischargeConfirmation';

interface ITotalOverviewProps {
	totals: {
		total_bill: string;
		amount_received: string;
		amount_receivable: string;
	};
	admission_info: {
		id: string;
		admit_timestamp: string;
		discharge_timestamp: string;
		is_discharged: boolean;
		doctor_name: string;
		purpose: string;
		guardian_name: string;
		guardian_phone: string;
		bed: {
			name: string;
		};
		ward: {
			floor: string;
			name: string;
		};
		patient: {
			name: string;
			phone: string;
		};
	};
}

const TotalOverview = (props: ITotalOverviewProps): JSX.Element => {
	const {
		totals: { total_bill, amount_received, amount_receivable },
		admission_info: {
			id: admission_id,
			bed: { name: bed },
			ward: { name: ward, floor },
			patient,
			is_discharged,
		},
	} = props;

	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	// const totalBill = parseFloat(total_bill);
	const amountReceived = parseFloat(amount_received);
	const amountReceivable = parseFloat(amount_receivable);
	const amountPayable = 0 - amountReceivable;
	const currencyTotalBill = withCurrency(total_bill);
	const currencyAmountReceived = withCurrency(amount_received);
	const currencyAmountReceivable = withCurrency(amount_receivable);
	const currencyAmountPayable = withCurrency(amountPayable);

	const location = `${floor === 0 ? 'G' : `L${floor}`} / ${ward} / ${bed}`;

	const dueColor = amountReceivable ? Colors.RED5 : Colors.GREEN5;
	const recievedColor = amountReceived < 0 ? Colors.RED5 : Colors.GREEN5;

	let toolTipContent = '';

	if (amountReceivable > 0) {
		toolTipContent = `Patient has not paid ${currencyAmountReceivable}`;
	} else if (amountReceivable < 0) {
		toolTipContent = `We owe ${currencyAmountPayable} to patient`;
	} else {
		toolTipContent = 'All dues are clear. Patient can be discharged';
	}

	const toggleOpen = () => setIsOpen((prev) => !prev);
	const redirectToAdmission = () => {
		router.push('/admission/[admission_id]', `/admission/${admission_id}`);
	};
	return (
		<Wrapper>
			<Container>
				<div
					className="row full-width space-between align-center"
					style={{ marginBottom: '32px' }}
				>
					<Location>{location}</Location>
					<Tooltip
						intent={amountReceivable === 0.0 ? 'success' : 'danger'}
						content={toolTipContent}
						position={Position.TOP_LEFT}
						disabled={is_discharged}
						defaultIsOpen={amountReceivable === 0.0}
					>
						<Icon
							icon={amountReceivable === 0.0 ? 'tick-circle' : 'delete'}
							iconSize={Icon.SIZE_LARGE}
							color={dueColor}
						/>
					</Tooltip>
				</div>
				<div className="row full-width space-between align-center">
					<FieldName>Patient Name</FieldName>
					<MoneyValue>{patient.name}</MoneyValue>
				</div>
				<div
					className="row full-width space-between align-center"
					style={{
						paddingBottom: '16px',
						marginBottom: '16px',
						borderBottom: '1px solid var(--border-color)',
					}}
				>
					<FieldName>Patient Phone</FieldName>
					<MoneyValue>{patient.phone}</MoneyValue>
				</div>
				<div className="row full-width space-between align-center">
					<FieldName>Total Bill</FieldName>
					<MoneyValue>{currencyTotalBill}</MoneyValue>
				</div>
				<div className="row full-width space-between align-center">
					<FieldName>Amount Recieved</FieldName>
					<MoneyValue color={recievedColor}>{currencyAmountReceived}</MoneyValue>
				</div>
				<div className="row full-width space-between align-center">
					<FieldName>Amount Recievable</FieldName>
					<MoneyValue color={dueColor}>{currencyAmountReceivable}</MoneyValue>
				</div>
			</Container>
			<ButtonContainer>
				<Button
					large
					intent="success"
					fill
					onClick={toggleOpen}
					disabled={amountReceivable !== 0.0 || is_discharged}
				>
					Discharge
				</Button>
			</ButtonContainer>
			<DischargeConfirmation
				reopenAdmission={false}
				admission_id={admission_id}
				showAlert={isOpen}
				toggleAlert={toggleOpen}
				ctaIntent="success"
				successCallback={redirectToAdmission}
			/>
		</Wrapper>
	);
};

export default TotalOverview;
