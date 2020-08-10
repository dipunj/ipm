import { useContext, useState } from 'react';
import { Button, Switch, Icon, Drawer, Position } from '@blueprintjs/core';
import { SessionCtx } from '../../Context/SessionContext';
import { ThemeCtx } from '../../Context/ThemeContext';
import { Container, Greeting, Wrapper, Column, IconContainer, MenuContainer } from './styles';
import request from '../../Request';

const switchStyle = { marginBottom: 0, marginRight: '16px' };
const Header = (): JSX.Element => {
	const {
		ctx: { name },
		refetchCtx,
	} = useContext(SessionCtx);

	const { isDark, toggleTheme } = useContext(ThemeCtx);
	const [show, setShow] = useState(false);

	const handleLogout = async () => {
		const response = await request.post('/session/auth/logout');
		if (response.data.success) {
			refetchCtx();
		}
	};

	const toggleMenu = () => setShow((show) => !show);

	const drawerClass = `main-menu ${isDark ? 'bp3-dark dark-styled' : 'light-styled'}`;
	// const backdropClass = `${!isDark ? 'dark-styled' : 'light-styled'}`;
	const menu = <MenuContainer>menu</MenuContainer>;

	return (
		<Wrapper>
			<Container>
				<Column>
					<IconContainer onClick={toggleMenu}>
						<Icon icon="menu" />
					</IconContainer>
					Hi, <Greeting>{name}</Greeting>
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
			<Drawer
				isOpen={show}
				position={Position.TOP}
				onClose={toggleMenu}
				className={drawerClass}
				// backdropClassName={backdropClass}
				// backdropProps={{
				// 	style: {
				// 		background: 'black',
				// 		boxShadow: 'none',
				// 	},
				// }}
			>
				{menu}
			</Drawer>
		</Wrapper>
	);
};

export default Header;
