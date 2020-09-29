import { H4, Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { WardType } from '../../../../../common/types';
import request from '../../../../../library/Request';
import SelectWardType from '../../../../../library/Select/WardType';
import { handleErrorToast, handleSuccessToast } from '../../../../../library/Toaster';

interface IFormData {
	floor?: number;
	ward_type?: WardType;
	ward_number?: number;
	name?: string;
}

const initialState: IFormData = {
	floor: undefined,
	ward_type: undefined,
	ward_number: undefined,
	name: undefined,
};

const NewWardForm = ({ refetchWardList }: { refetchWardList: () => void }) => {
	const [formData, setFormData] = useState(() => initialState);

	const onChange = (fieldName?: string): any => {
		switch (fieldName) {
			case 'ward_type':
				return (item: WardType, _event?: SyntheticEvent<HTMLElement, Event>) => {
					setFormData((prev) => ({
						...prev,
						[fieldName]: item,
					}));
				};
			default:
				// for text/number type inputs
				return (e: ChangeEvent<HTMLInputElement>) => {
					const {
						target: { name, value },
					} = e;
					setFormData((prev) => ({
						...prev,
						[name]: value,
					}));
				};
		}
	};

	const handleCreate = async () => {
		try {
			const response = await request.post('/setup/ward/create', {
				...formData,
			});

			handleSuccessToast(response);
			refetchWardList();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	return (
		<div className="column full-width">
			<H4>New Ward</H4>
			<div
				className="row full-width align-center space-between"
				style={{
					padding: '16px 32px',
					borderRadius: '16px',
					border: '1px solid var(--border-color)',
					marginBottom: '36px',
				}}
			>
				<FormGroup label="Floor" className="mr-input">
					<InputGroup
						name="floor"
						value={formData.floor?.toString()}
						type="number"
						onChange={onChange()}
					/>
				</FormGroup>
				<FormGroup label="Ward Type" className="mr-input">
					<SelectWardType
						activeItem={formData.ward_type}
						onItemSelect={onChange('ward_type')}
					/>
				</FormGroup>
				<FormGroup label="Ward Number" className="mr-input">
					<InputGroup
						name="ward_number"
						value={formData.ward_number?.toString()}
						type="number"
						onChange={onChange()}
					/>
				</FormGroup>
				<div>
					<Button intent="primary" large outlined onClick={handleCreate}>
						Create
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NewWardForm;
