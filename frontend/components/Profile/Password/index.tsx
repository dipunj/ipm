import { useContext, useState, ChangeEvent } from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { SessionCtx } from '../../../library/Context/SessionContext';
import { InputContainer, ButtonContainer, ListItem, ChecksContainer } from './styles';
import { validatePassword } from '../../../helpers';
import { handleErrorToast, handleSuccessToast } from '../../../library/Toaster';
import request from '../../../library/Request';

const ResetPassword = (): JSX.Element => {
	const { refetchCtx }: any = useContext(SessionCtx);

	const [params, setParams] = useState({
		password: '',
		passwordConfirmation: '',
	});

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = event;

		setParams((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const passwordChecks = validatePassword(params.password);
	const isPasswordValid = passwordChecks.filter((chck) => !chck.satisfy).length === 0;

	const handlePasswordChange = async () => {
		try {
			const response = await request.post('/session/auth/reset', {
				password: params.password,
				password_confirmation: params.passwordConfirmation,
			});
			if (response.data.success) {
				handleSuccessToast(response);
				refetchCtx();
			}
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const passwordConfirmMatch =
		params.password === params.passwordConfirmation && params.password !== '';

	const buttonIntent = passwordConfirmMatch
		? isPasswordValid
			? 'success'
			: 'warning'
		: 'danger';

	return (
		<div className="page-content">
			<h1 className="page-title">Reset Password</h1>
			<div className="column center full-width">
				<div className="wrap row space-evenly align-center full-width">
					<InputContainer>
						<FormGroup
							className="full-width"
							label="New Password"
							labelFor="password"
							labelInfo="(required)"
						>
							<InputGroup
								fill
								value={params.password}
								onChange={handleInputChange}
								id="password"
								name="password"
								placeholder="New Password"
								type="password"
							/>
						</FormGroup>
						<FormGroup
							className="full-width"
							label="Confirm Password"
							labelFor="password-confirmation"
							labelInfo="(required)"
						>
							<InputGroup
								fill
								value={params.passwordConfirmation}
								onChange={handleInputChange}
								id="password-confirmation"
								name="passwordConfirmation"
								placeholder="Confirm New Password"
								type="password"
							/>
						</FormGroup>
						<ButtonContainer>
							<Button
								disabled={!passwordConfirmMatch || !isPasswordValid}
								intent={buttonIntent}
								large
								fill
								onClick={handlePasswordChange}
							>
								Submit
							</Button>
						</ButtonContainer>
					</InputContainer>
					<ChecksContainer>
						Password must have:
						<ul className="bp3-list">
							{passwordChecks.map(({ message, satisfy }) => (
								<ListItem satisfy={satisfy}>{message}</ListItem>
							))}
						</ul>
					</ChecksContainer>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
