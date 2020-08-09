import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import request from '../../Request';

const SessionCtx = createContext({});

const SessionCtxProvider = ({ children }) => {
	const router = useRouter();
	const [ctx, setCtx] = useState({});

	useEffect(() => {
		request
			.get('/session/auth/status')
			.then((res) => {
				if (res?.data.success && res?.data.is_authenticated) {
					setCtx({ ...res.data.response.data });
				} else {
					// TODO: Create toast here
					router.push('/');
				}
			})
			.catch((err) => console.log(err));
	}, []);

	if (Object.keys(ctx).length === 0) return <div>Loading...</div>;
	return <SessionCtx.Provider value={{ ctx, setCtx }}>{children}</SessionCtx.Provider>;
};

// wont ever be used for Functional components
const SessionCtxConsumer = SessionCtx.Consumer;

export default SessionCtxProvider;
export { SessionCtxConsumer, SessionCtx };
