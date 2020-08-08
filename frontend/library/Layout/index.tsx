import Header from '../Header';

// used by _app.tsx
const getDefaultLayout = (page) => {
	return (
		<>
			<Header />
			{page}
		</>
	);
};

export default getDefaultLayout;
