import { createContext, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import request from '../../Request';

const SessionCtx = createContext({});

const SessionCtxProvider = ({ children }) => {
	const router = useRouter();
	const [ctx, setCtx] = useState({});

	useEffect(() => {
		alert('session provider render');
		request
			.get('/session/auth/status')
			.then((res) => {
				if (res?.data.success && res?.data.is_authenticated) {
					setCtx((prev) => ({
						...prev,
						data: res.data.response.data,
					}));
				} else {
					// TODO: Create toast here
					router.push('/');
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return <SessionCtx.Provider value={{ ctx, setCtx }}>{children}</SessionCtx.Provider>;
};

const SessionCtxConsumer = SessionCtx.Consumer;

export default SessionCtxProvider;
export { SessionCtxConsumer, SessionCtx };
