// import { useState } from 'react';

const Landing = (): JSX.Element => {
	// const [show, setShow] = useState(false);

	// const showLogin = () => {};

	return (
		<div className="flex items-center bg-gray-900 h-screen">
			<div className="sm:w-full w-1/2 flex justify-center">
				<img src="/images/logo_large.png" alt="hospital logo" />
			</div>
			<div className="sm:w-full w-1/2 flex items-center">
				<h1 className="text-white text-6xl leading-tight" style={{ fontFamily: 'Lobster' }}>
					{process.env.NEXT_PUBLIC_HOSPITAL_NAME}
				</h1>
			</div>
		</div>
	);
};

export default Landing;
