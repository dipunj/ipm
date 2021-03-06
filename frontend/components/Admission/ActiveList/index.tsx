import { useState, useEffect } from 'react';
import PageControls from '../PageControls';
import request from '../../../library/Request';
import AdmissionCard from '../Card';
import { FlexWrapper } from './styles';
import Pagination from '../../../library/Pagination';
import { handleErrorToast } from '../../../library/Toaster';
import Loader from '../../../library/Loader';

const AdmissionsOverview = (): JSX.Element => {
	const [loading, setLoading] = useState(true);
	const [response, setResponse]: [any, any] = useState(null);
	const [recordsPerPage] = useState(10);
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSearchQuery(event.target.value);

	const fetchCurrentAdmissions = async (page = 1) => {
		setLoading(true);
		try {
			const apiResponse = await request.get('/management/admission/list', {
				params: {
					is_discharged: false,
					query: searchQuery,
					page,
					records_per_page: recordsPerPage,
				},
			});
			setResponse(apiResponse.data.response.data);
			setLoading(false);
			window.scrollTo(0, 0);
		} catch (error) {
			handleErrorToast(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (searchQuery === '') fetchCurrentAdmissions();
	}, [searchQuery]);

	let content = null;

	if (loading) {
		content = <Loader />;
	} else if (!loading && (response?.result || []).length === 0) {
		content = <div>No Admissions</div>;
	} else {
		content = (
			<>
				{response.result
					? response.result.map((data: any) => (
							<AdmissionCard key={data.id} {...{ data }} />
					  ))
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
			<div className="page-content">
				<h1 className="page-title">Active Admissions</h1>
				<PageControls
					{...{
						doSearch: () => fetchCurrentAdmissions(),
						searchQuery,
						handleSearchQueryChange,
					}}
				/>
				<FlexWrapper>{content}</FlexWrapper>
			</div>
		</>
	);
};

export default AdmissionsOverview;
