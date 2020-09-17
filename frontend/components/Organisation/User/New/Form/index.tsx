import { FormGroup, InputGroup, Button, Callout } from '@blueprintjs/core';
import { ChangeEvent, SyntheticEvent } from 'react';
import { Wrapper } from './styles';
import AccountTypeSelect from '../../../../../library/Select/AccountType';
import BuildingSelect, { IBuilding } from '../../../../../library/Select/Building';
import { AccountType } from '../../../../../common/types';

export interface UserFormDataType {
	name: string;
	login_id: string;
	password: string;
	account_type: AccountType;
	buildings: IBuilding[];
}

interface IUserFormProps {
	data: UserFormDataType;
	setData: any;
	handleTagRemove: (_tag: string, index: number) => void;
	handleClear: () => void;
	handleAPICall: () => void;
}

const UserForm = (props: IUserFormProps) => {
	const { data, setData, handleAPICall, handleClear, handleTagRemove } = props;

	const onChange = (fieldName?: string): any => {
		switch (fieldName) {
			case 'account_type':
				return (item: AccountType, _event?: SyntheticEvent<HTMLElement, Event>) => {
					setData((prev: UserFormDataType) => ({
						...prev,
						[fieldName]: item,
						buildings: item === 'admin' ? [] : prev.buildings,
					}));
				};
			case 'buildings':
				return (building: IBuilding) => {
					setData((prev: UserFormDataType) => {
						if (prev.buildings.filter((bld) => bld.id === building.id).length === 1) {
							// building is already selected
							const newList = prev.buildings.filter((bld) => bld.id !== building.id);
							return {
								...prev,
								[fieldName]: newList,
							};
						}
						// building is not selected
						return {
							...prev,
							[fieldName]: [...prev.buildings, building],
						};
					});
				};
			default:
				return (event: ChangeEvent<HTMLInputElement>) => {
					const {
						target: { name, value },
					} = event;

					setData((prev: UserFormDataType) => ({
						...prev,
						[name]: value,
					}));
				};
		}
	};

	return (
		<div className="page-content">
			<h1 className="page-title">New User</h1>
			<Wrapper>
				<div className="row full-width">
					<FormGroup label="Full Name" className="full-width">
						<InputGroup
							fill
							name="name"
							type="text"
							placeholder="Display Name"
							value={data.name}
							onChange={onChange()}
						/>
					</FormGroup>
				</div>
				<div className="row full-width wrap">
					<div className="min-half-width">
						<FormGroup label="Username (Login ID)" className="mr-input">
							<InputGroup
								type="text"
								name="login_id"
								placeholder="Phone Number / Email ID"
								value={data.login_id}
								onChange={onChange()}
							/>
						</FormGroup>
					</div>
					<div className="min-half-width">
						<FormGroup
							label="Password"
							helperText="Can be changed later by user"
							// className="min-half-width"
						>
							<InputGroup
								name="password"
								type="text"
								placeholder="Password"
								value={data.password}
								onChange={onChange()}
							/>
						</FormGroup>
					</div>
				</div>
				<div className="row full-width wrap">
					<div className="min-half-width">
						<FormGroup label="Account Type" className="min-half-width">
							<AccountTypeSelect
								intent="none"
								activeItem={data.account_type}
								onItemSelect={onChange('account_type')}
							/>
						</FormGroup>
					</div>
					<div className="min-half-width">
						<FormGroup label="Authorised Buildings" className="min-half-width">
							{data.account_type !== 'admin' ? (
								<BuildingSelect
									multiSelect
									fill
									activeItemList={data.buildings}
									onItemSelect={onChange('buildings')}
									multiSelectTagRemove={handleTagRemove}
									clearButton={
										data.buildings.length > 0 ? (
											<Button icon="cross" minimal onClick={handleClear} />
										) : undefined
									}
								/>
							) : (
								<Callout>Admin account type has access to all buildings</Callout>
							)}
						</FormGroup>
					</div>
				</div>
				<div className="row justify-center" style={{ marginTop: '24px' }}>
					<div className="min-quarter-width">
						<Button fill intent="primary" outlined large onClick={handleAPICall}>
							Create
						</Button>
					</div>
				</div>
			</Wrapper>
		</div>
	);
};

export default UserForm;
