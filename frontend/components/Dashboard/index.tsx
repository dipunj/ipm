import { useState, useEffect, FormEvent } from 'react';
import PageControls from './PageControls';
import request from '../../library/Request';
import AdmissionCard from './Card';
import { FlexWrapper } from './styles';
import Pagination from '../../library/Pagination';

const AdmissionsOverview = (): JSX.Element => {
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState(null);
	const [recordsPerPage, setRecordsPerPage] = useState(2);
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchQueryChange = (event: FormEvent<HTMLElement>) =>
		setSearchQuery(event.target.value);

	const fetchCurrentAdmissions = async (page) => {
		setLoading(true);
		try {
			const apiResponse = await request.get('/management/admission/current', {
				params: {
					query: searchQuery,
					page,
					records_per_page: recordsPerPage,
				},
			});
			setResponse(apiResponse.data.response.data);
			setLoading(false);
		} catch (error) {
			// TODO: show toast here
		}
	};

	useEffect(() => {
		if (searchQuery === '') fetchCurrentAdmissions(1);
	}, [searchQuery]);

	let content = null;

	if (loading) {
		content = <div>Loading...</div>;
	} else if (!loading && response.result.length === 0) {
		content = <div>No Admissions</div>;
	} else {
		content = (
			<>
				{response.result
					? response.result.map((data) => <AdmissionCard key={data.id} {...{ data }} />)
					: null}
				<Pagination
					{...{
						currentPage: response.page,
						totalRecords: response.count,
						recordsPerPage,
						onPageChange: fetchCurrentAdmissions,
					}}
				/>
			</>
		);
	}

	return (
		<>
			<h1 className="page-title">Current Admissions</h1>
			<PageControls
				{...{
					doSearch: () => fetchCurrentAdmissions(),
					searchQuery,
					handleSearchQueryChange,
				}}
			/>
			<div className="page-content">
				<FlexWrapper>{content}</FlexWrapper>
			</div>
		</>
	);
};

export default AdmissionsOverview;
