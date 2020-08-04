// import { useState } from 'react';

import { useState } from 'react';
import Modal from '../../library/Modal';

const Landing = (): JSX.Element => {
	const [show, setShow] = useState(false);

	const toggleModal = () => {
		setShow((show) => !show);
	};

	const modalContent = (
		<div>
			<input type="text" name="loginid" placeholder="login id" />
			<input type="password" name="password" placeholder="password" />
		</div>
	);

	return (
		<div>
			<div>
				<img src="/images/logo_large.png" alt="hospital logo" />
			</div>
			<div>
				<h1>{process.env.NEXT_PUBLIC_HOSPITAL_NAME}</h1>
				<h2>In-Patient Department</h2>
				<button>Sign-In</button>
			</div>
		</div>
	);
};

export default Landing;
