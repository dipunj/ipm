import { useContext, useState, ChangeEvent } from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { SessionCtx } from '../../../library/Context/SessionContext';
import { InputContainer, ButtonContainer } from './styles';

const ResetPassword = (): JSX.Element => {
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

	const allOkay = params.password === params.passwordConfirmation && params.password !== '';
	return (
		<div className="page-content">
			<h1 className="page-title">Reset Password</h1>
			<div className="column center full-width">
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
							placeholder="New Password"
							type="password"
						/>
					</FormGroup>
				</InputContainer>
				<ButtonContainer>
					<Button disabled={!allOkay} intent={allOkay ? 'success' : 'danger'} large fill>
						Submit
					</Button>
				</ButtonContainer>
			</div>
		</div>
	);
};

export default ResetPassword;
