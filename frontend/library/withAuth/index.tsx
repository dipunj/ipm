import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { SessionCtx } from '../Context/SessionContext';
import AuthRules from './access';
import CustomErrorPage from '../../pages/404';
import Header from '../Layout/Header';
import MainContent from '../Layout/Body';
import { AccountType } from '../../common/types';

// since authorisation of components is coupled with the path at which they are accessed
// hence, based on the path we can redirect an unauthorised role to home page.

const withAuthorisation = ({ children }: { children: any }): JSX.Element | null => {
	const { ctx }: any = useContext(SessionCtx);

	const { account_type }: { account_type: AccountType } = ctx;

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
