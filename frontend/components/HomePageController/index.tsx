import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { SessionCtx } from '../../library/Context/SessionContext';
import Loader from '../../library/Loader';

const HomePage = (): JSX.Element => {
	const {
		ctx: { buildings, account_type },
	}: any = useContext(SessionCtx);

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
					You don&apos;t have access to any building/branch.
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
