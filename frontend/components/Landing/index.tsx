// import { useState } from 'react';

import { useState } from 'react';
import { Layer, Button } from 'grommet';
import Modal from '../../library/Modal';

const Landing = (): JSX.Element => {
	const [show, setShow] = useState(false);

	const toggleModal = () => {
		setShow((show) => !show);
	};

	const modalContent = (
		<div className="flex flex-col justify-between items-center h-24">
			<input
				className="rounded-lg border p-2 focus:rounded-lg"
				type="text"
				name="loginid"
				placeholder="login id"
			/>
			<input
				className="rounded-lg border p-2 focus:rounded-lg focus:border-none"
				type="password"
				name="password"
				placeholder="password"
			/>
		</div>
	);

	return (
		<div className="flex items-center bg-landing h-screen">
			<div className="w-5/12 flex justify-center">
				<img
					src="/images/logo_large.png"
					alt="hospital logo"
					className="rounded-full"
					style={{ boxShadow: '0px 0px 80px 4px black' }}
				/>
			</div>
			<div className="w-7/12 flex items-left flex-col">
				<h1 className="font-Amiko text-white leading-tight text-brand-title">
					{process.env.NEXT_PUBLIC_HOSPITAL_NAME}
				</h1>
				<h2
					className="text-white text-brand-subtitle mt-16 mb-4"
					style={{ fontFamily: 'Exo 2', fontWeight: 300 }}
				>
					In-Patient Department
				</h2>
				<button
					type="button"
					className="bg-red-600 text-white md:w-40 text-2xl font-light py-2 hover:bg-white hover:text-red-600 hover:shadow-2xl"
					onClick={toggleModal}
				>
					Sign-In
				</button>
			</div>
			{/* {show && (
				<Modal
					handleClose={toggleModal}
					handleOutsideClick={toggleModal}
					content={modalContent}
				/>
			)} */}
		</div>
	);
};

export default Landing;
