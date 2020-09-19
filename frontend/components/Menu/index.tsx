import { MenuContainer } from './styles';
import useMenu from './hook';

interface IMainMenuProps {
	accountType: string;
	toggleMenu: () => void;
}

const MainMenu = (props: IMainMenuProps) => {
	const { accountType, toggleMenu } = props;
	const menuComponent = useMenu(accountType, toggleMenu);

	// drawer height is 50vh from @blueprint/core default drawer size = 50%
	return (
		<div className="row align-center full-height full-width">
			<MenuContainer>{menuComponent}</MenuContainer>;
		</div>
	);
};

export default MainMenu;
