import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { SessionCtx } from '../Context/SessionContext';
import AuthRules, { AdminMenu } from './access';
import CustomErrorPage from '../../pages/404';
import Header from '../Layout/Header';
import MainContent from '../Layout/Body';

// since authorisation of components is coupled with the path at which they are accessed
// hence, based on the path we can redirect an unauthorised role to home page.

const withAuthorisation = ({ children }): JSX.Element | null => {
	const {
		ctx: { account_type },
	} = useContext(SessionCtx);

	const router = useRouter();

	if (AuthRules[account_type].includes(router.pathname)) {
		return children;
	}

	return (
		<>
			<Header />
			<MainContent>
				<CustomErrorPage />
			</MainContent>
		</>
	);
};

export default withAuthorisation;
