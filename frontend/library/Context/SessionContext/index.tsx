import { createContext, useState } from 'react';

const SessionCtx = createContext({});

const SessionCtxProvider = ({ children }) => {
	const [ctx, setCtx] = useState({});

	return <SessionCtx.Provider value={{ ctx, setCtx }}>{children}</SessionCtx.Provider>;
};

const SessionCtxConsumer = SessionCtx.Consumer;

export default SessionCtxProvider;
export { SessionCtxConsumer, SessionCtx };
