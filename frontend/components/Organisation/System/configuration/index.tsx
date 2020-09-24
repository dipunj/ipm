import { Button, FileInput } from '@blueprintjs/core';
import React, { ChangeEvent, useContext, useState } from 'react';
import { shortDateOptions } from '../../../../helpers';
import { SessionCtx } from '../../../../library/Context/SessionContext';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';

const SystemConfiguration = (): JSX.Element => {
	const { refetchCtx } = useContext(SessionCtx);
	const [file, setFile] = useState({});
	const [displayText, setDisplayText] = useState('Select Configuration File...');

	const handleRestore = async () => {
		try {
			const response = await request.post('/setup/configuration/restore', {
				...file,
			});
			handleSuccessToast(response);
			refetchCtx();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = e;
		if ((files || []).length > 0) {
			const reader = new FileReader();
			reader.onload = async (event: ProgressEvent<FileReader>) => {
				const text = event?.target?.result;
				setDisplayText(files[0].name);
				setFile(JSON.parse(text));
			};
			reader.readAsText(files[0]);
		}
	};
	const downloadConfig = async () => {
		try {
			const response = await request.get('/setup/configuration/backup', {
				responseType: 'blob',
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute(
				'download',
				`${new Date().toLocaleString('en-us', shortDateOptions)}_IPM_backup.json`
			);
			link.setAttribute('id', 'temp-link');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			handleErrorToast(error);
		}
	};
	return (
		<div className="page-content">
			<h1 className="page-title">System configuration</h1>
			<div className="row space-between full-width" style={{ height: '25vh' }}>
				<div
					className="column space-between full-height bp3-callout bp3-intent-success"
					style={{ flex: 1, marginRight: '16px' }}
				>
					<h3 className="bp3-heading">Download Current Config</h3>
					<div className="bp3-ui-text">
						This will generate a confiugartion file containing all the buildings and
						users. Which can be uploaded on a hard reseted system. The newly created
						users would have to reset their password. As the passwords are stored in
						encrypted format in the database, so they can&apos;t be backed up in the
						config file
					</div>
					<div className="row align-center justify-center full-width">
						<Button
							large
							icon="cloud-download"
							intent="success"
							onClick={downloadConfig}
						>
							Download Config
						</Button>
					</div>
				</div>
				<div
					className="column space-between full-height bp3-callout bp3-intent-primary"
					style={{ flex: 1, marginLeft: '16px' }}
				>
					<h3 className="bp3-heading">Restore From Config</h3>
					<div>
						If you already have an earlier config file for a building. After the
						restore, All administrator account's password would be:{' '}
						<strong>'admin'</strong>, all other user's password would be{' '}
						<strong>'password'</strong>
					</div>
					<FileInput
						text={displayText}
						className="bp3-intent-primary"
						hasSelection={Object.keys(file).length > 0}
						onInputChange={handleFileUpload}
					/>
					<div className="row align-center justify-center full-width">
						<Button
							large
							icon="cloud-upload"
							intent="primary"
							onClick={handleRestore}
							disabled={Object.keys(file).length === 0}
						>
							Upload Config
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SystemConfiguration;
