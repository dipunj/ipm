import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionCtx } from '../Context/SessionContext';

const Header = (): JSX.Element => {
	const [count, setCount] = useState(0);
	const router = useRouter();
	const increment = () => setCount((prev) => prev + 1);
	const gotoLanding = () => router.push('/landing');
	const userData = useContext(SessionCtx);
	return (
		<div>
			{JSON.stringify(userData)}
			<h1>{count}</h1>
			<button onClick={increment}>Increase</button>
			<button onClick={gotoLanding}>Landing</button>
		</div>
	);
};

export default Header;
