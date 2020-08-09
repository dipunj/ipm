import Header from './Header';
import Providers from '../Providers';
import MainContent from './Body';

// used by _app.tsx
const getDefaultLayout = (page) => {
	return (
		<Providers>
			<Header />
			<MainContent>{page}</MainContent>
		</Providers>
	);
};

export default getDefaultLayout;
