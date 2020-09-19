import { MenuContainer } from './styles';
import useMenu from './hook';

interface IMainMenuProps {
	accountType: string;
	toggleMenu: () => void;
}

const MainMenu = (props: IMainMenuProps) => {
	const { accountType, toggleMenu } = props;
	const menuComponent = useMenu(accountType, toggleMenu);

	return (
		<div className="row align-center full-height full-width">
			<MenuContainer>{menuComponent}</MenuContainer>;
		</div>
	);
};

export default MainMenu;
