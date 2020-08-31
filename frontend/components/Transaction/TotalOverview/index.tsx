import { withCurrency, prettyJSON } from '../../../helpers';
import { IAdmissionData } from '../../Admission/EditExisting';

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
			bed: { name: bed },
			ward: { name: ward, floor },
			patient,
		},
	} = props;

	const totalBill = withCurrency(total_bill);
	const amountReceived = withCurrency(amount_received);
	const amountReceivable = withCurrency(amount_receivable);

	return (
		<div className="column space-between" style={{ height: '80vh' }}>
			<div className="column">
				<div>total bill</div>
				<div>{totalBill}</div>
			</div>
			<div className="column">
				<div>amount recieved</div>
				<div>{amountReceived}</div>
			</div>
			<div className="column">
				<div>amount recievable</div>
				<div>{amountReceivable}</div>
			</div>
			<div>{bed}</div>
			<div>{`${ward}/ ${floor}`}</div>
		</div>
	);
};

export default TotalOverview;
