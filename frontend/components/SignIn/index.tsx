import { useState, useContext } from 'react';
import { Button, Dialog, FormGroup, InputGroup } from '@blueprintjs/core';
import { Background, Column, Logo, CenterColumn, Brand, AppName } from './styles';
import request from '../../library/Request';
import { SessionCtx } from '../../library/Context/SessionContext';
import { handleErrorToast, handleSuccessToast } from '../../library/Toaster';

const signInButtonStyles = {
	background: 'var(--brand-color)',
	fontSize: '24px',
	padding: '16px 32px',
	borderRadius: 0,
	fontWeight: 300,
};

const dialogStyles = { width: 'min(300px, 100vw)' };

const Landing = (): JSX.Element => {
	const { refetchCtx }: { refetchCtx?: any } = useContext(SessionCtx);
	const [open, setOpen] = useState(false);

	const [loginId, setLoginId] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setLoginId(event.target.value);
	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(event.target.value);

	const toggleModal = () => setOpen((val: boolean) => !val);

	const handleSubmit = async () => {
		try {
			const response = await request.post('/session/auth/login', {
				login_id: loginId,
				password,
			});
			const {
				data: { success, is_authenticated },
			} = response;

			if (success && is_authenticated) {
				refetchCtx();
			} else {
				handleSuccessToast(response);
			}
		} catch (error) {
			handleErrorToast(error);
		}
	};

	return (
		<Background>
			<CenterColumn>
				<Logo src={process.env.NEXT_PUBLIC_LOGO_URL} alt="Hospital Logo" />
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
					<form>
						<FormGroup labelFor="loginid" labelInfo="(required)">
							<InputGroup
								id="loginid"
								name="login_id"
								placeholder="login id"
								large
								value={loginId}
								onChange={handleLoginChange}
								autoComplete="username"
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
								autoComplete="current-password"
							/>
						</FormGroup>
					</form>
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

Landing.getLayout = (page: any) => page;

export default Landing;
