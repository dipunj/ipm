import { useContext, useState, useEffect } from 'react';
import { Button, Switch, Icon, Drawer, Position, Popover } from '@blueprintjs/core';
import { SessionCtx } from '../../Context/SessionContext';
import { ThemeCtx } from '../../Context/ThemeContext';
import { Container, Greeting, Wrapper, Column, IconContainer } from './styles';
import request from '../../Request';
import { getCookie, setCookie } from '../../../helpers';
import ProfileOptions from '../../../components/Profile/Menu';
import MainMenu from '../../../components/Menu';
import BuildingSelect, { IBuilding } from '../../Select/Building';

const switchStyle = { marginBottom: 0, marginRight: '16px' };

const Header = ({ buildingToggle = true }): JSX.Element => {
	const {
		ctx: { name, buildings, account_type, image_url },
		refetchCtx,
	}: any = useContext(SessionCtx);

	const { isDark, toggleTheme }: any = useContext(ThemeCtx);

	// menu code
	const [showMainMenu, setShowMainMenu] = useState(false);
	const toggleMainMenu = () => setShowMainMenu((prev) => !prev);
	const closeMainMenu = () => setShowMainMenu(false);
	// building controls
	const showBuildingToggle = buildingToggle && buildings.length !== 0;
	const allowBuildingToggle = buildings.length > 1;
	const currentBuilding = getCookie('_ipm_sb');
	const [selectedBuilding, setSelectedBuilding] = useState(
		buildings.filter(({ id }: { id: string }) => id === currentBuilding)[0]
	);

	useEffect(() => {
		if (!selectedBuilding && buildings.length > 0) {
			setCookie('_ipm_sb', buildings[0].id);
			setSelectedBuilding(buildings[0]);
		}
	}, [selectedBuilding]);

	const handleBuildingSelect = async (building: IBuilding, _e: any) => {
		setCookie('_ipm_sb', building.id);
		setSelectedBuilding(building);
		window.location.reload();
	};

	// session controls
	const handleLogout = async () => {
		const response = await request.post('/session/auth/logout');
		if (response.data.success) {
			refetchCtx();
		}
	};

	const drawerClass = `main-menu custom-background ${
		isDark ? 'bp3-dark dark-styled' : 'light-styled'
	}`;

	const goToHome = () => (window.location.pathname = '/');

	return (
		<Wrapper>
			<Container>
				<Column>
					{showBuildingToggle ? (
						<IconContainer onClick={toggleMainMenu}>
							<Icon icon="menu" />
						</IconContainer>
					) : (
						<IconContainer disabled>
							<Icon icon="menu" />
						</IconContainer>
					)}
					Hi,
					<Popover
						content={<ProfileOptions closeMenu={closeMainMenu} />}
						position="bottom"
					>
						<Greeting>{name}</Greeting>
					</Popover>
					<IconContainer onClick={goToHome}>
						<Icon icon="home" />
					</IconContainer>
				</Column>
				{showBuildingToggle > 0 ? (
					<Column>
						<BuildingSelect
							disabled={!allowBuildingToggle}
							items={buildings}
							onItemSelect={handleBuildingSelect}
							activeItem={selectedBuilding}
						/>
					</Column>
				) : (
					<Column>
						{buildings.length === 0 && (
							<div className="bp3-callout bp3-intent-danger">No Building Access</div>
						)}
					</Column>
				)}
				<Column>
					<Switch
						checked={isDark}
						onClick={toggleTheme}
						innerLabel="light"
						innerLabelChecked="dark"
						style={switchStyle}
					/>
					<Button rightIcon="log-out" intent="danger" onClick={handleLogout}>
						Sign Out
					</Button>
				</Column>
			</Container>
			<Drawer
				isOpen={showMainMenu}
				position={Position.TOP}
				onClose={toggleMainMenu}
				className={drawerClass}
				portalClassName="main-menu-portal"
			>
				<MainMenu accountType={account_type} toggleMenu={closeMainMenu} />
			</Drawer>
		</Wrapper>
	);
};

export default Header;
