import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { Button, Callout, FormGroup, InputGroup } from '@blueprintjs/core';
import AccountTypeSelect from './Select/AccountType';
import { AccountType } from '../../../../common/types';
import BuildingSelect, { IBuilding } from '../../../../library/Select/Building';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';
import { Wrapper } from './styles';

interface FormDataType {
	name: string;
	login_id: string;
	password: string;
	account_type: AccountType;
	buildings: IBuilding[];
}

const initialData = {
	name: '',
	login_id: '',
	password: '',
	account_type: 'operator',
	buildings: [],
};

const NewUser = () => {
	const [data, setData]: [FormDataType, any] = useState(initialData);

	const onChange = (fieldName?: string): any => {
		switch (fieldName) {
			case 'account_type':
				return (item: AccountType, _event?: SyntheticEvent<HTMLElement, Event>) => {
					setData((prev: FormDataType) => ({
						...prev,
						[fieldName]: item,
						buildings: item === 'admin' ? [] : prev.buildings,
					}));
				};
			case 'buildings':
				return (building: IBuilding) => {
					setData((prev: FormDataType) => {
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

					setData((prev: FormDataType) => ({
						...prev,
						[name]: value,
					}));
				};
		}
	};

	const handleTagRemove = (_tag: string, index: number) => {
		setData((prev: FormDataType) => {
			const newList = [...prev.buildings];
			newList.splice(index, 1);
			return { ...prev, buildings: newList };
		});
	};

	const handleClear = () => {
		setData((prev: FormDataType) => ({
			...prev,
			buildings: [],
		}));
	};

	const handleAPICall = async () => {
		const { buildings, ...rest } = data;
		try {
			const response = await request.post('/setup/user/create', {
				...rest,
				password_confirmation: rest.password,
				building_id_list: buildings.map((bld) => bld.id),
			});
			handleSuccessToast(response);
			setData(initialData);
		} catch (error) {
			handleErrorToast(error);
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

export default NewUser;
