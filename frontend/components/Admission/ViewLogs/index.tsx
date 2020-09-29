import React, { useState } from 'react';
import { dateFormatOptions } from '../../../helpers';
import useFetch from '../../../library/hooks/fetch';
import { layoutWithoutBuildingToggle } from '../../../library/Layout';
import Pagination from '../../../library/Pagination';
import AdmissionDetailCard from '../ViewExisting/Card';
import ViewAdmissionSkeleton from '../ViewExisting/skeleton';

const ViewLogs = ({ admission_id }: { admission_id: string }): JSX.Element => {
	const [recordsPerPage] = useState(3);
	const { loading, data, refetch } = useFetch('/management/admission/logs', {
		params: { admission_id, page: 1, records_per_page: recordsPerPage },
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

	if (loading) {
		return <ViewAdmissionSkeleton />;
	}
	const logCount = data.result.length;

	return (
		<div className="page-content">
			<div className="page-title">Change logs</div>
			<div className="column align-center space-between">
				{logCount > 0 ? (
					data.result.map((card: any) => {
						const creationDate = new Date(card.created_at).toLocaleString(
							'en-GB',
							dateFormatOptions
						);
						const cardData = {
							...card,
							patient: {
								name: card.patient_name,
								gender: card.patient_gender,
								phone: card.patient_phone,
								yob: card.patient_yob,
							},
						};
						return (
							<div className="page-content">
								<div className="column align-end">
									Snapshot at {creationDate}.
									<div className="bp3-text-muted bp3-text-small">
										<strong>{card.updated_by.name} </strong>
										changed this data to{' '}
										{logCount === 1 ? 'current data' : 'the next snapshot'}
									</div>
								</div>
								<AdmissionDetailCard {...{ data: cardData, logMode: true }} />
							</div>
						);
					})
				) : (
					<>
						<strong>No changes made</strong>
						(admission hasn&apos;t been modified after creation)
					</>
				)}
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

ViewLogs.getLayout = layoutWithoutBuildingToggle;

export default ViewLogs;
