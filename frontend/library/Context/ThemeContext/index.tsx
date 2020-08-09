import { createContext, useState, useContext } from 'react';
import { SessionCtx } from '../SessionContext';
import request from '../../Request';

const ThemeCtx = createContext({});

const ThemeCtxProvider = ({ children }): JSX.Element => {
	const {
		ctx: { prefers_dark },
	} = useContext(SessionCtx);

	const [isDark, setIsDark] = useState(prefers_dark);

	const toggleTheme = async () => {
		const response = await request.post('/session/auth/theme', {
			prefers_dark: !isDark,
		});
		// toggle the theme immediately for the user, if there is an error show him a toast that his preference wasn't updated at the remote server
		setIsDark((isDark) => !isDark);
		if (!response.data.success) {
			// TODO: Toast an error here
		}
	};

	return (
		<ThemeCtx.Provider value={{ isDark, setIsDark, toggleTheme }}>
			<div id="themeRoot" className={isDark ? 'bp3-dark' : ''}>
				{children}
			</div>
		</ThemeCtx.Provider>
	);
};

// wont ever be used for Functional components
const ThemeCtxConsumer = ThemeCtx.Consumer;

export default ThemeCtxProvider;
export { ThemeCtx, ThemeCtxConsumer };
