import SessionCtxProvider from '../Context/SessionContext';
import ThemeCtxProvider from '../Context/ThemeContext';
import BuildingCtxProvider from '../Context/BuildingContext';
import WithAuthorisation from '../withAuth';

const Providers = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
	return (
		<SessionCtxProvider>
			<BuildingCtxProvider>
				<ThemeCtxProvider>
					<WithAuthorisation>{children}</WithAuthorisation>
				</ThemeCtxProvider>
			</BuildingCtxProvider>
		</SessionCtxProvider>
	);
};

export default Providers;
