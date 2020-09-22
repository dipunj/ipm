import { Dialog, Button, Callout, H1, InputGroup, FormGroup, Label } from '@blueprintjs/core';
import React, { ChangeEvent, useContext, useState } from 'react';
import { BuildingCtx } from '../../../../library/Context/BuildingContext';
import { SessionCtx } from '../../../../library/Context/SessionContext';
import { layoutWithoutBuildingToggle } from '../../../../library/Layout';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';
import { Value } from '../../../Admission/ViewExisting/styles';

const ResetSystem = (): JSX.Element => {
	const {
		ctx: { name },
		refetchCtx,
	} = useContext(SessionCtx);

	const {
		ctx: { branch_code, city },
	} = useContext(BuildingCtx);

	const [hard, setHard] = useState(false);
	const [soft, setSoft] = useState(false);
	const [textConfirmed, setTextConfirmed] = useState(false);

	const confirmationString = `I ${name} confirm`;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;

		if (value.toLowerCase() === confirmationString.toLowerCase()) {
			setTextConfirmed(true);
		} else {
			setTextConfirmed(false);
		}
	};

	const toggleShowHard = () => setHard((prev) => !prev);
	const toggleShowSoft = () => setSoft((prev) => !prev);

	const hardReset = async () => {
		try {
			const response = await request.post('/setup/configuration/hard_reset');
			handleSuccessToast(response);
			refetchCtx();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const softReset = async () => {
		try {
			// resets the current building (_ipm_sb)
			const response = await request.post('/setup/configuration/soft_reset');
			handleSuccessToast(response);
			refetchCtx();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	return (
		<div className="page-content">
			<div className="page-title">Reset System</div>
			<div className="row space-between full-width" style={{ height: '25vh' }}>
				<div
					className="column space-between full-height bp3-callout bp3-intent-danger"
					style={{ flex: 1, marginRight: '16px' }}
				>
					<h3 className="bp3-heading">Hard Reset</h3>
					<div>
						Clicking on Hard Reset will wipe out all the data, including{' '}
						<strong>
							building structures, wards, users, admission data, transaction data.
						</strong>
					</div>
					<div className="row align-center justify-center full-width">
						<Button large intent="danger" onClick={toggleShowHard}>
							HARD RESET
						</Button>
					</div>
				</div>
				<div
					className="column space-between full-height bp3-callout bp3-intent-primary"
					style={{ flex: 1, marginLeft: '16px' }}
				>
					<h3 className="bp3-heading">Soft Reset</h3>
					<div>
						If you only want to delete admission data, transaction data click soft reset
					</div>
					<div className="row align-center justify-center full-width">
						<Button large intent="primary" onClick={toggleShowSoft}>
							SOFT RESET
						</Button>
					</div>
				</div>
			</div>
			<Dialog
				isOpen={hard}
				isCloseButtonShown
				title={<div style={{ padding: '16px 0px' }}>Are you absolutely sure?</div>}
				onClose={toggleShowHard}
				className="custom-background"
			>
				<div className="bp3-callout bp3-intent-warning">
					Unexpected bad things will happen if you don’t read this!
				</div>
				<div className="bp3-dialog-body">
					This action cannot be undone. It will remove the following
					<ul className="bp3-list">
						<li>All buildings</li>
						<li>All wards, beds</li>
						<li>All active, past admissions</li>
						<li>All the transactions</li>
						<li>All users</li>
					</ul>
					To login into the system again, use the following credentials:
					<div className="full-width column align-center bp3-callout bp3-intent-primary">
						<FormGroup label="Login ID" inline>
							<InputGroup value="admin" disabled />
						</FormGroup>
						<FormGroup label="Password" inline>
							<InputGroup value="admin" disabled />
						</FormGroup>
					</div>
					<FormGroup
						label={
							<div className="column">
								Please type
								<strong className="full-width row justify-center">
									{confirmationString}
								</strong>
							</div>
						}
					>
						<InputGroup onChange={handleChange} type="text" fill autoFocus />
					</FormGroup>
				</div>
				<div className="bp3-dialog-footer">
					<Button
						intent="danger"
						large
						disabled={!textConfirmed}
						fill
						onClick={hardReset}
					>
						Hard Reset System
					</Button>
				</div>
			</Dialog>
			<Dialog
				isOpen={soft}
				isCloseButtonShown
				title={<div style={{ padding: '16px 0px' }}>Are you sure?</div>}
				onClose={toggleShowSoft}
				className="custom-background"
			>
				<div className="bp3-dialog-body">
					This action cannot be undone. It will remove the following ONLY on building{' '}
					<strong style={{ textTransform: 'capitalize' }}>
						{city} / {branch_code}
						{' :'}
					</strong>
					<ul className="bp3-list">
						<li>All active, past admissions</li>
						<li>All the transactions</li>
						<li>All analytics data regarding revenue, income</li>
					</ul>
					<FormGroup
						label={
							<div className="column">
								Please type
								<strong className="full-width row justify-center">
									{confirmationString}
								</strong>
							</div>
						}
					>
						<InputGroup onChange={handleChange} type="text" fill autoFocus />
					</FormGroup>
				</div>
				<div className="bp3-dialog-footer">
					<Button
						intent="primary"
						large
						fill
						disabled={!textConfirmed}
						onClick={softReset}
					>
						Soft Reset Branch {branch_code}
					</Button>
				</div>
			</Dialog>
		</div>
	);
};

export default ResetSystem;
