import { MenuContainer } from './styles';
import useMenu from './hook';

interface IMainMenuProps {
	accountType: string;
	toggleMenu: () => void;
}

const MainMenu = (props: IMainMenuProps) => {
	const { accountType, toggleMenu } = props;
	const menuComponent = useMenu(accountType, toggleMenu);

	return <MenuContainer>{menuComponent}</MenuContainer>;
};

export default MainMenu;
