// import { useState } from 'react';

import { useState, FormEvent } from 'react';
import { Button, Dialog, FormGroup, InputGroup } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import { Background, Column, Logo, CenterColumn, Brand, AppName } from './styles';
import request from '../../library/Request';

const signInButtonStyles = {
	background: '#EA3333',
	fontSize: '24px',
	padding: '16px 32px',
	borderRadius: 0,
	fontWeight: 300,
};

const dialogStyles = { width: 'min(300px, 100vw)' };

const Landing = (): JSX.Element => {
	const router = useRouter();

	const [open, setOpen] = useState(false);

	const [loginId, setLoginId] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginChange = (event: FormEvent<HTMLElement>) => setLoginId(event.target.value);
	const handlePasswordChange = (event: FormEvent<HTMLElement>) => setPassword(event.target.value);

	const toggleModal = () => setOpen((val: boolean) => !val);

	const handleSubmit = async () => {
		try {
			const {
				data: { success, is_authenticated },
			} = await request.post('/session/auth/login', {
				login_id: loginId,
				password,
			});

			if (success && is_authenticated) {
				router.push('/');
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Background>
			<CenterColumn>
				<Logo src="/images/logo_large.png" alt="Hospital Logo" />
			</CenterColumn>
			<Column>
				<Brand>{process.env.NEXT_PUBLIC_HOSPITAL_NAME}</Brand>
				<AppName>In-Patient Department</AppName>
				<div>
					<Button
						intent="danger"
						text="Sign In"
						large
						style={signInButtonStyles}
						onClick={toggleModal}
					/>
				</div>
			</Column>
			<Dialog title="Login" isOpen={open} onClose={toggleModal} style={dialogStyles}>
				<div className="bp3-dialog-body">
					<FormGroup labelFor="loginid" labelInfo="(required)">
						<InputGroup
							id="loginid"
							name="login_id"
							placeholder="login id"
							large
							value={loginId}
							onChange={handleLoginChange}
						/>
					</FormGroup>
					<FormGroup labelFor="password" labelInfo="(required)">
						<InputGroup
							large
							id="password"
							type="password"
							name="password"
							placeholder="password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</FormGroup>
				</div>
				<div className="bp3-dialog-footer">
					<Button
						type="submit"
						intent="primary"
						text="Sign In"
						onClick={handleSubmit}
						fill
					/>
				</div>
			</Dialog>
		</Background>
	);
};

Landing.getLayout = (page) => page;

export default Landing;
