import Header from './Header';
import MainContent from './Body';

// used by _app.tsx
const getDefaultLayout = (page) => {
	return (
		<>
			<Header />
			<MainContent>{page}</MainContent>
		</>
	);
};

export default getDefaultLayout;
