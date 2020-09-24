import React, { useState } from 'react';
import useFetch from '../../../library/hooks/fetch';
import Loader from '../../../library/Loader';
import Pagination from '../../../library/Pagination';
import Card, { HeaderCard } from './Card';

const ViewTransactionLogs = ({ transaction_id }: { transaction_id: string }): JSX.Element => {
	const [recordsPerPage] = useState(50);
	const { loading, data, refetch } = useFetch('/management/transaction/logs', {
		params: {
			transaction_id,
			page: 1,
			records_per_page: recordsPerPage,
		},
	});

	const fetchPage = async (page = 1) => {
		await refetch({
			params: {
				transaction_id,
				page,
				records_per_page: recordsPerPage,
			},
		});
		window.scrollTo(0, 0);
	};

	if (loading) return <Loader />;

	const logLength = data.count;

	return (
		<div className="page-content">
			<h1 className="page-title">Transaction logs</h1>

			<div className="column align-center full-width">
				<HeaderCard />
				{logLength > 0 && data.result.map((info) => <Card {...{ data: info }} />)}
				<div className="form-cta-margin">
					{data.result.length > 0 && (
						<Pagination
							{...{
								currentPage: data.page,
								totalRecords: data.count,
								recordsPerPage,
								onPageChange: fetchPage,
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ViewTransactionLogs;
