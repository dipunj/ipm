import { Card } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import { prettyJSON } from '../../../helpers';

interface IAdmissionCard {
	name: string;
	age?: string;
	phone: string;
	ward: {
		name: string;
	};
	guardian_name: string;
	guardian_phone: string;
}

const AdmissionCard = (props: IAdmissionCard) => {
	const router = useRouter();
	const {
		id: admission_id,
		patient: { name, phone },
		guardian_name,
		guardian_phone,
		ward: { name: ward },
	} = props.data;
	const showAdmissionPage = () => {
		router.push(`/admissions/${admission_id}`);
	};

	return (
		<Card interactive className="custom-card">
			<h1>{name}</h1>
			<h6>{phone}</h6>
			<h2>{guardian_name}</h2>
			<h3>{guardian_phone}</h3>
			<h4>{ward}</h4>
		</Card>
	);
};

export default AdmissionCard;
