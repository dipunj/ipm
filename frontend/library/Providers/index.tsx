import { ThemeConsumer } from 'styled-components';
import SessionCtxProvider from '../Context/SessionContext';
import ThemeCtxProvider from '../Context/ThemeContext';

const Providers = ({ children }) => {
	return (
		<SessionCtxProvider>
			<ThemeCtxProvider>{children}</ThemeCtxProvider>
		</SessionCtxProvider>
	);
};

export default Providers;
