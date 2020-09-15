import { Card, H3, H4 } from '@blueprintjs/core';
import DetailsCard from './Card';
import NewWardForm from './NewWardForm';
import useFetch from '../../../../library/hooks/fetch';
import Loader from '../../../../library/Loader';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';

const WardList = () => {
	const { data, loading, refetch } = useFetch('/setup/building/structure');

	if (loading) return <Loader />;

	const { wards } = data;

	const floorWiseData = wards.reduce((acc, wrd) => {
		if (acc.hasOwnProperty(wrd.floor)) {
			acc[wrd.floor].push(wrd);
		} else {
			acc[wrd.floor] = [wrd];
		}
		return acc;
	}, {});

	const handleBedCreate = async (ward_id: string, bedName: string) => {
		try {
			const response = await request.post('/setup/bed/create', {
				ward_id,
				name: bedName,
			});
			handleSuccessToast(response);
			refetch();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const handleBedDelete = async (bed_id: string) => {
		try {
			const response = await request.post('/setup/bed/delete', {
				id: bed_id,
			});
			handleSuccessToast(response);
			refetch();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const handleBedUpdate = async (bed_id: string, bedName: string) => {
		try {
			const response = await request.post('/setup/bed/update', {
				id: bed_id,
				name: bedName,
			});
			handleSuccessToast(response);
			refetch();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const handleWardDelete = async (ward_id: string) => {
		try {
			const response = await request.post('/setup/ward/delete', { id: ward_id });
			handleSuccessToast(response);
			refetch();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	return (
		<div className="page-content">
			<div className="page-title">Wards & Beds</div>
			<NewWardForm refetchWardList={refetch} />
			<div className="column">
				<H4>Existing Wards</H4>
				{Object.keys(floorWiseData)
					.sort((a: any, b: any) => b - a)
					.map((floor) => {
						return (
							<Card className="custom-background">
								<H3 className="bp3-ui-text">
									{floor == 0 ? 'Ground' : `Level ${floor}`}
								</H3>
								<div className="row full-width align-center">
									<div className="flex-grow">
										{floorWiseData[floor].map((ward) => (
											<DetailsCard
												key={ward.id}
												{...{
													wardData: ward,
													handleBedCreate,
													handleBedDelete,
													handleBedUpdate,
													handleWardDelete,
												}}
											/>
										))}
									</div>
								</div>
							</Card>
						);
					})}
			</div>
		</div>
	);
};

export default WardList;
