import { createContext, useState, useContext, useEffect } from 'react';
import { SessionCtx } from '../SessionContext';
import request from '../../Request';

const ThemeCtx = createContext({});

const ThemeCtxProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const {
		ctx: { prefers_dark },
	}: any = useContext(SessionCtx);

	const [isDark, setIsDark] = useState(prefers_dark);

	const toggleTheme = async () => {
		// toggle the theme immediately for the user, if there is an error show him a toast that his preference wasn't updated at the remote server

		const newTheme = !isDark;
		await setIsDark(newTheme);
		// saveToLS('prefers_dark', newTheme);

		const response = await request.post('/session/auth/theme', {
			prefers_dark: !isDark,
		});
		if (!response.data.success) {
			// TODO: Toast an error here
		}
	};

	useEffect(() => {
		document.body.className = isDark ? 'bp3-dark dark-styled' : 'light-styled';
	}, [isDark]);

	return (
		<ThemeCtx.Provider value={{ isDark, setIsDark, toggleTheme }}>{children}</ThemeCtx.Provider>
	);
};

// wont ever be used for Functional components
const ThemeCtxConsumer = ThemeCtx.Consumer;

export default ThemeCtxProvider;
export { ThemeCtx, ThemeCtxConsumer };
