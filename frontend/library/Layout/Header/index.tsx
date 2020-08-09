import { useContext, useState } from 'react';
import { Button, Switch, Icon } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import { SessionCtx } from '../../Context/SessionContext';
import { prettyJSON } from '../../../helpers';
import { ThemeCtx } from '../../Context/ThemeContext';
import { Container, Greeting, Wrapper, Column } from './styles';
import request from '../../Request';

const switchStyle = { marginBottom: 0, marginRight: '16px' };

const Header = (): JSX.Element => {
	const {
		ctx: { name },
		setCtx,
	} = useContext(SessionCtx);

	const router = useRouter();
	const { isDark, toggleTheme } = useContext(ThemeCtx);
	const handleLogout = async () => {
		const response = await request.post('/session/auth/logout');
		if (response.data.success) {
			setCtx({});
			router.push('/login');
		}
	};

	return (
		<Wrapper isDark={isDark}>
			<Container>
				<Column>
					<Icon icon="menu" />
					<Greeting>Hi, {name}</Greeting>
				</Column>
				<Column>
					<Switch
						checked={isDark}
						onClick={toggleTheme}
						innerLabel="light"
						innerLabelChecked="dark"
						style={switchStyle}
					/>
					<Button intent="danger" onClick={handleLogout}>
						Sign Out
					</Button>
				</Column>
			</Container>
		</Wrapper>
	);
};

export default Header;
