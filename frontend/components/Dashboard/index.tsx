import { useState, useEffect } from 'react';
import PageControls from './PageControls';
import request from '../../library/Request';
import { prettyJSON } from '../../helpers';
import AdmissionCard from './Card';
import { FlexWrapper } from './styles';

const AdmissionsOverview = (): JSX.Element => {
	const [admissions, setAdmissions] = useState([]);

	const fetchCurrentAdmissions = async () => {
		try {
			const response = await request.get('/management/admission/current');
			setAdmissions(response.data.response.data);
		} catch (error) {}
	};

	useEffect(() => {
		fetchCurrentAdmissions();
	}, []);

	return (
		<>
			<h1 className="page-title">Current Admissions</h1>
			<PageControls />
			<div className="page-div">
				<FlexWrapper>
					{admissions ? admissions.map((adm) => <AdmissionCard data={adm} />) : null}
				</FlexWrapper>
			</div>
		</>
	);
};

export default AdmissionsOverview;
