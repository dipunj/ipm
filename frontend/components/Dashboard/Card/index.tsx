import { useRouter } from 'next/router';
import {
	Card,
	Title,
	WardName,
	Column,
	Phone,
	Row,
	Label,
	DateValue,
	GuardianTitle,
	GuardianPhone,
	TimeValue,
} from './styles';

interface IAdmissionCard {
	data: {
		id: string;
		patient: {
			name: string;
			phone: string;
		};
		name: string;
		age?: string;
		phone: string;
		ward: {
			name: string;
			floor: number;
		};
		bed: {
			name: string;
		};
		admit_timestamp: Date;
		discharge_timestamp: Date | null;
		guardian_name: string;
		guardian_phone: string;
	};
}

const AdmissionCard = (props: IAdmissionCard) => {
	const router = useRouter();

	const {
		id: admission_id,
		patient: { name, phone },
		guardian_name,
		guardian_phone,
		bed: { name: bed },
		ward: { name: ward, floor },
		admit_timestamp,
		discharge_timestamp,
	} = props.data;

	const showAdmissionPage = () => {
		router.push(`/admission/${admission_id}`);
	};

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

	const [admissionDate, admissionTime] = new Date(admit_timestamp)
		.toLocaleString('en-GB', options)
		.split(',');

	const dischargeDate = discharge_timestamp
		? new Date(discharge_timestamp).toLocaleString('en-GB', options).split(',')[0]
		: '-';

	const wardLocation = `${floor === 0 ? 'G' : `L${floor}`} / ${ward} / ${bed}`;

	return (
		<Card onClick={showAdmissionPage}>
			<Row marginBottom="32px">
				<Column>
					<Title>{name}</Title>
					<Phone>{phone}</Phone>
				</Column>
				<WardName>{wardLocation}</WardName>
			</Row>
			<Row>
				<Column>
					<Label>Admission Time</Label>
					<DateValue>{admissionDate}</DateValue>
					<TimeValue>{`(${admissionTime.trim()})`}</TimeValue>
				</Column>
				<Column>
					<Label>Expected Discharge Time*</Label>
					<DateValue>{dischargeDate}</DateValue>
				</Column>
				<Column>
					<Label right>Guardian</Label>
					<GuardianTitle>{guardian_name}</GuardianTitle>
					<GuardianPhone>{guardian_phone}</GuardianPhone>
				</Column>
			</Row>
		</Card>
	);
};

export default AdmissionCard;
