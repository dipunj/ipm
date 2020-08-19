import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import request from '../../Request';
import SignIn from '../../../components/SignIn';

const SessionCtx = createContext({});

const SessionCtxProvider = ({ children }: { children: JSX.Element }) => {
	const router = useRouter();
	const [ctx, setCtx] = useState({});
	const [loading, setLoading] = useState(true);

	const fetchCtx = async () => {
		try {
			await setLoading(true);

			// must be asynchronous to avoid a flash of signin page, since setLoading(false) would execute before the api call is complete, causing a render with SigIn being rendered for a moment
			await request
				.get('/session/auth/status')
				.then((res) => {
					if (res.data.success && res.data.is_authenticated) {
						setCtx({ ...res.data.response.data });
						// saveToLS('prefers_dark', res.data.response.data.prefers_dark);
					} else {
						// TODO: Create toast here
						router.push('/');

						// crucial for logout
						setCtx({});
					}
				})
				.catch((err) => console.log(err));
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchCtx();
	}, []);

	if (loading) {
		return <div style={{ height: '100vh', width: '100vw' }} />;
	}
	if (!loading && Object.keys(ctx).length === 0) {
		return (
			<SessionCtx.Provider value={{ ctx, setCtx, refetchCtx: fetchCtx }}>
				<SignIn />
			</SessionCtx.Provider>
		);
	}
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
