import Header from './Header';
import MainContent from './Body';
import Providers from '../Providers';

// used by _app.tsx
const getDefaultLayout = (page: JSX.Element): JSX.Element => {
	return (
		<Providers>
			<Header />
			<MainContent>{page}</MainContent>
		</Providers>
	);
};

export const layoutWithoutBuildingToggle = (page: JSX.Element): JSX.Element => {
	return (
		<Providers>
			<Header buildingToggle={false} />
			<MainContent>{page}</MainContent>
		</Providers>
	);
};

export default getDefaultLayout;
