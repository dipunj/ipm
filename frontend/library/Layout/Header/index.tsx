import { useContext, useState } from 'react';
import { SessionCtx } from '../../Context/SessionContext';
import { prettyJSON } from '../../../helpers';
import { ThemeCtx } from '../../Context/ThemeContext';
import { Container } from './styles';

const Header = (): JSX.Element => {
	const {
		ctx: { name, account_type },
	} = useContext(SessionCtx);
	const { isDark, setIsDark, toggleTheme } = useContext(ThemeCtx);
	const handleLogout = async () => {
		const response = await request.post('/session/auth/logout');
		// TODO show toast here depending on response
	};

	return (
		<Container>
			Hi, {name}
			<button onClick={toggleTheme}>Toggle</button>
		</Container>
	);
};

export default Header;
