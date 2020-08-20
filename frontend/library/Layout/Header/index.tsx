import { useContext, useState, useEffect } from 'react';
import { Button, Switch, Icon, Drawer, Position, MenuItem } from '@blueprintjs/core';
import { Select, ItemRenderer } from '@blueprintjs/select';
import { useRouter } from 'next/router';
import { SessionCtx } from '../../Context/SessionContext';
import { ThemeCtx } from '../../Context/ThemeContext';
import { Container, Greeting, Wrapper, Column, IconContainer, MenuContainer } from './styles';
import request from '../../Request';
import { getCookie, setCookie } from '../../../helpers';

const switchStyle = { marginBottom: 0, marginRight: '16px' };
const BuildingSelect = Select.ofType<any>();

interface IBuilding {
	id: string;
	city: string;
	branch_code: string;
}

const renderBuildingItem: ItemRenderer<IBuilding> = (
	building: IBuilding,
	{ handleClick, modifiers }
) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}
	return (
		<MenuItem
			active={modifiers.active}
			key={building.id}
			label={building.branch_code}
			onClick={handleClick}
			text={<div style={{ textTransform: 'capitalize' }}>{building.city}</div>}
		/>
	);
};

const Header = (): JSX.Element => {
	const {
		ctx: { name, buildings },
		refetchCtx,
	}: any = useContext(SessionCtx);

	const router = useRouter();

	const { isDark, toggleTheme }: any = useContext(ThemeCtx);

	// menu code
	const [showMainMenu, setShowMainMenu] = useState(false);
	const toggleMainMenu = () => setShowMainMenu((showMainMenu) => !showMainMenu);

	// building controls
	const allowBuildingToggle = buildings.length > 1;
	const currentBuilding = getCookie('_ipm_sb');
	const [selectedBuilding, setSelectedBuilding] = useState(
		buildings.filter(({ id }: { id: string }) => id === currentBuilding)[0]
	);

	useEffect(() => {
		if (!selectedBuilding) {
			setCookie('_ipm_sb', buildings[0].id);
			setSelectedBuilding(buildings[0]);
		}
	}, [selectedBuilding]);

	const handleBuildingSelect = async (building: IBuilding, _e: any) => {
		setCookie('_ipm_sb', building.id);
		setSelectedBuilding(building);
		window.history.go();
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
	const menu = <MenuContainer>menu</MenuContainer>;

	return (
		<Wrapper>
			<Container>
				<Column>
					<IconContainer onClick={toggleMainMenu}>
						<Icon icon="menu" />
					</IconContainer>
					Hi, <Greeting>{name}</Greeting>
				</Column>
				<Column>
					<BuildingSelect
						disabled={!allowBuildingToggle}
						items={buildings}
						itemRenderer={renderBuildingItem}
						onItemSelect={handleBuildingSelect}
						activeItem={selectedBuilding}
						filterable={false}
					>
						<Button
							disabled={!allowBuildingToggle}
							text={
								<div style={{ textTransform: 'capitalize' }}>
									{`${selectedBuilding.city} / ${selectedBuilding.branch_code}`}
								</div>
							}
							rightIcon="double-caret-vertical"
						/>
					</BuildingSelect>
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
				isOpen={showMainMenu}
				position={Position.TOP}
				onClose={toggleMainMenu}
				className={drawerClass}
				portalClassName="main-menu-portal"
			>
				{menu}
			</Drawer>
		</Wrapper>
	);
};

export default Header;
