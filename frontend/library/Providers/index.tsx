import { ThemeConsumer } from 'styled-components';
import SessionCtxProvider from '../Context/SessionContext';
import ThemeCtxProvider from '../Context/ThemeContext';
import BuildingCtxProvider from '../Context/BuildingContext';

const Providers = ({ children }) => {
	return (
		<SessionCtxProvider>
			<BuildingCtxProvider>
				<ThemeCtxProvider>{children}</ThemeCtxProvider>
			</BuildingCtxProvider>
		</SessionCtxProvider>
	);
};

export default Providers;
