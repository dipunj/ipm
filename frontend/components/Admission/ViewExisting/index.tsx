import { useEffect, useState } from 'react';
import { prettyJSON } from '../../../helpers';
import request from '../../../library/Request';

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

const ViewAdmission = ({ admission_id }) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		request
			.get('/management/admission/find', {
				params: {
					admission_id,
				},
			})
			.then((res) => {
				setData(res.data.response.data);
			});
	}, []);

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
		created_by: { name: created_by, id: created_by_id },
		last_updated_by: { name: last_updated_by, id: last_updated_by_id },
		patient: { name: patientName, age: patientAge, gender: patientGender },
		transactions,
	} = data;

	const location = `${floor === 0 ? 'G' : 'L'} / ${wardName} / ${bedName}`;
	return (
		<>
			<div className="page-content">
				<div>{location}</div>
				<div>{patientName}</div>
			</div>
			{prettyJSON(data)}
		</>
	);
};

export default ViewAdmission;
