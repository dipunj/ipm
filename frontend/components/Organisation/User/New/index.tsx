import { FormGroup, InputGroup } from '@blueprintjs/core';
import { useState, SyntheticEvent, ChangeEvent } from 'react';
import AccountTypeSelect from './Select/AccountType';
import { AccountType } from '../../../../common/types';
import { prettyJSON } from '../../../../helpers';
import BuildingSelect from '../../../../library/Select/Building';

interface FormDataType {
	name: string;
	login_id: string;
	password: string;
	account_type: AccountType | '';
}

const NewUser = () => {
	const [data, setData]: [FormDataType, any] = useState({
		name: '',
		login_id: '',
		password: '',
		account_type: '',
	});

	const onChange = (fieldName?: string): any => {
		switch (fieldName) {
			case 'account_type':
				return (item: AccountType, _event?: SyntheticEvent<HTMLElement, Event>) => {
					setData((prev: FormDataType) => ({
						...prev,
						[fieldName]: item,
					}));
				};
			default:
				return (event: ChangeEvent<HTMLInputElement>) => {
					const {
						target: { name, value },
					} = event;

					setData((prev: FormDataType) => ({
						...prev,
						[name]: value,
					}));
				};
		}
	};
	return (
		<div className="page-content">
			<h1 className="page-title">New User</h1>
			<FormGroup label="Full Name">
				<InputGroup
					name="name"
					type="text"
					placeholder="Name"
					value={data.name}
					onChange={onChange()}
				/>
			</FormGroup>
			<FormGroup
				label="User ID"
				helperText="Enter phone number without ISD code/ leading zero"
			>
				<InputGroup
					type="text"
					name="login_id"
					placeholder="User ID (phone number)"
					value={data.login_id}
					onChange={onChange()}
				/>
			</FormGroup>
			<FormGroup label="Password" helperText="Can be changed later by user">
				<InputGroup
					name="password"
					type="text"
					placeholder="Password"
					value={data.password}
					onChange={onChange()}
				/>
			</FormGroup>
			<FormGroup>
				<AccountTypeSelect
					intent="none"
					activeItem={data.account_type}
					onItemSelect={onChange('account_type')}
				/>
			</FormGroup>
			<FormGroup />
			{prettyJSON(data)}
		</div>
	);
};

export default NewUser;
