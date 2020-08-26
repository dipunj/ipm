import { createContext, useState, useContext, useEffect } from 'react';
import request from '../../Request';
import { SessionCtx } from '../SessionContext';
import { handleErrorToast } from '../../Toaster';

const BuildingCtx = createContext({});

const BuildingCtxProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const { refetchCtx: refetchSessionCtx }: any = useContext(SessionCtx);

	const [ctx, setCtx] = useState({});
	const [loading, setLoading] = useState(true);

	const fetchBuilding = async () => {
		try {
			await setLoading(true);
			const response = await request.get('/setup/building/structure');
			if (response.data.success && response.data.is_authenticated) {
				setCtx({ ...response.data.response.data });
			} else {
				refetchSessionCtx();
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			handleErrorToast(error);
		}
	};

	useEffect(() => {
		fetchBuilding();
	}, []);

	if (loading) return <div style={{ height: '100vh', width: '100vw' }} />;
	return <BuildingCtx.Provider value={{ ctx, setCtx }}>{children}</BuildingCtx.Provider>;
};

// wont ever be used for Functional components
const BuildingCtxConsumer = BuildingCtx.Consumer;

export default BuildingCtxProvider;
export { BuildingCtx, BuildingCtxConsumer };
