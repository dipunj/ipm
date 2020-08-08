import SessionCtxProvider from '../Context/SessionContext';

const Providers = ({ children }) => {
	return <SessionCtxProvider>{children}</SessionCtxProvider>;
};

export default Providers;
