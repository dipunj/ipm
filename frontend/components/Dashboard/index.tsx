import { useState, useEffect } from 'react';
import PageControls from './PageControls';
import request from '../../library/Request';
import { prettyJSON } from '../../helpers';
import AdmissionCard from './Card';
import { FlexWrapper } from './styles';

const AdmissionsOverview = (): JSX.Element => {
	const [admissions, setAdmissions] = useState([]);

	const [page, setPage] = useState(1);
	const [resultsPerPage, setResultsPerPage] = useState(10);

	const fetchCurrentAdmissions = async () => {
		try {
			const response = await request.get('/management/admission/current', {
				page,
				resultsPerPage,
			});
			setAdmissions(response.data.response.data.result);
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
					{admissions
						? admissions.map((data) => <AdmissionCard key={data.id} {...{ data }} />)
						: null}
				</FlexWrapper>
			</div>
		</>
	);
};

export default AdmissionsOverview;
