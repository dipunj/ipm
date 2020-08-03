import { useState } from 'react';

const tester = () => {
	const [theme, setTheme] = useState('theme-light');

	const toggleTheme = () => {
		setTheme((old) => (old == 'theme-light' ? 'theme-dark' : 'theme-light'));
	};

	return (
		<div className={theme}>
			<div className="bg-shade-900">
				<button className="text-shade-100" onClick={toggleTheme}>
					Hello
				</button>
			</div>
		</div>
	);
};

export default tester;