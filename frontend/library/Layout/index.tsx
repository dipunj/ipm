import Header from '../Header';
import Providers from '../Providers';

// used by _app.tsx
const getDefaultLayout = (page) => {
	return (
		<Providers>
			<Header />
			{page}
		</Providers>
	);
};

export default getDefaultLayout;
