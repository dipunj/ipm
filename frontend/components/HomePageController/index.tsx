import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AccountType } from '../../common/types';
import { SessionCtx } from '../../library/Context/SessionContext';
import Loader from '../../library/Loader';
import { IBuilding } from '../../library/Select/Building';

const HomePage = (): JSX.Element => {
	const {
		ctx: { buildings, account_type },
	}: { ctx: { buildings: IBuilding[]; account_type: AccountType } } = useContext(SessionCtx);

	const router = useRouter();
	useEffect(() => {
		router.push('/admission/active');
		if (buildings.length === 0) {
			switch (account_type) {
				case 'admin':
					router.push('/admission/active');
					break;
				case 'manager':
					router.push('/admission/active');
					break;
				case 'operator':
					router.push('/admission/active');
					break;
				default:
					router.push('/admission/active');
					break;
			}
		}
	}, []);

	if (buildings.length === 0) {
		return (
			<div className="page-content">
				<div
					className="column full-height justify-center align-center bp3-callout bp3-intent-danger"
					style={{ minHeight: '20vh' }}
				>
					<h1 className="bp3-heading" style={{ margin: '48px 0px 24px' }}>
						Please Contact Admin
					</h1>
					You don't have access to any building/branch.
				</div>
			</div>
		);
	}

	return (
		<div className="page-content column justify-center" style={{ minHeight: '80vh' }}>
			<Loader />
		</div>
	);
};

export default HomePage;
