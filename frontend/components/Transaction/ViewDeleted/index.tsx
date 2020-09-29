import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useFetch from '../../../library/hooks/fetch';
import Loader from '../../../library/Loader';
import Pagination from '../../../library/Pagination';
import Card, { HeaderCard } from '../ViewLogs/Card';

const ViewDeletedTransactions = ({ admission_id }: { admission_id: string }): JSX.Element => {
	const router = useRouter();
	const [recordsPerPage] = useState(50);
	const { data, loading, refetch } = useFetch('/management/transaction/deleted', {
		params: {
			admission_id,
			page: 1,
			records_per_page: recordsPerPage,
		},
	});

	const fetchPage = async (page = 1) => {
		await refetch({
			params: {
				admission_id,
				page,
				records_per_page: recordsPerPage,
			},
		});
		window.scrollTo(0, 0);
	};

	const showLogs = (transaction_id: string) =>
		router.push('/logs/transaction/[transaction_id]', `/logs/transaction/${transaction_id}`);

	if (loading) return <Loader />;

	const { count } = data;
	return (
		<div className="page-content">
			<h1 className="page-title">Deleted Transactions</h1>
			{count > 0 ? (
				<div className="column align-center">
					<HeaderCard deleted />
					{data.result.map((info: any) => (
						<Card data={info} onClick={() => showLogs(info.id)} />
					))}
					<div className="form-cta-margin">
						<Pagination
							{...{
								currentPage: data.page,
								totalRecords: data.count,
								recordsPerPage,
								onPageChange: fetchPage,
							}}
						/>
					</div>
				</div>
			) : (
				'No Deleted Transactions'
			)}
		</div>
	);
};

export default ViewDeletedTransactions;
