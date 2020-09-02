import { useState, useEffect } from 'react';
import { DateRange } from '@blueprintjs/datetime';
import PageControls from '../PageControls';
import request from '../../../library/Request';
import AdmissionCard from '../Card';
import { FlexWrapper } from './styles';
import Pagination from '../../../library/Pagination';
import { handleErrorToast } from '../../../library/Toaster';
import Loader from '../../../library/Loader';

const PastAdmissions = (): JSX.Element => {
	const [loading, setLoading] = useState(true);
	const [response, setResponse]: [any, any] = useState(null);
	const [recordsPerPage] = useState(10);
	const [searchQuery, setSearchQuery] = useState('');
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);

	const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSearchQuery(event.target.value);

	const fetchPastAdmissions = async (page = 1) => {
		setLoading(true);
		try {
			// if (fromDate && toDate && fromDate.getTime() === toDate.getTime()) {
			// }
			const apiResponse = await request.get('/management/admission/list', {
				params: {
					is_discharged: true,
					query: searchQuery,
					page,
					records_per_page: recordsPerPage,
					from_date: fromDate,
					to_date: toDate,
				},
			});
			setResponse(apiResponse.data.response.data);
			setLoading(false);
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const handleDateChange = ([startDate, endDate]: DateRange) => {
		// startDate?.setHours(0, 0, 0, 0);
		// endDate?.setHours(0, 0, 0, 0);
		setFromDate(startDate);
		setToDate(endDate);
	};

	useEffect(() => {
		if (searchQuery === '') fetchPastAdmissions();
	}, [searchQuery]);

	let content = null;

	if (loading) {
		content = <Loader />;
	} else if (!loading && response.result.length === 0) {
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
						onPageChange: fetchPastAdmissions,
					}}
				/>
			</>
		);
	}

	return (
		<>
			<div className="page-content">
				<h1 className="page-title">Past Admissions</h1>
				<PageControls
					{...{
						doSearch: () => fetchPastAdmissions(),
						searchQuery,
						handleSearchQueryChange,
						fromDate,
						toDate,
						handleDateChange,
					}}
				/>
				<FlexWrapper>{content}</FlexWrapper>
			</div>
		</>
	);
};

export default PastAdmissions;
