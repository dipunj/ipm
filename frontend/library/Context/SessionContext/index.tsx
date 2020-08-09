import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import request from '../../Request';

const SessionCtx = createContext({});

const SessionCtxProvider = ({ children }) => {
	const router = useRouter();
	const [ctx, setCtx] = useState({});

	const fetchCtx = () => {
		request
			.get('/session/auth/status')
			.then((res) => {
				if (res?.data.success && res?.data.is_authenticated) {
					setCtx({ ...res.data.response.data });
				} else {
					// TODO: Create toast here
					router.push('/login');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchCtx();
	}, []);

	if (Object.keys(ctx).length === 0) return <div />;
	return (
		<SessionCtx.Provider value={{ ctx, setCtx, refetchCtx: fetchCtx }}>
			{children}
		</SessionCtx.Provider>
	);
};

// wont ever be used for Functional components
const SessionCtxConsumer = SessionCtx.Consumer;

export default SessionCtxProvider;
export { SessionCtxConsumer, SessionCtx };
