import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { ChangeEvent } from 'react';

interface IProps {
	formTitle: string;
	data: {
		branch_code: string;
		name_line: string;
		address_line: string;
		locality: string;
		city: string;
		administrative_area: string;
		postal_code: string;
		country: string;
	};
	setData: any;
	handleSubmit: () => void;
	ctaName: string;
}

const BuildingForm = (props: IProps) => {
	const {
		formTitle = 'New Building',
		data: {
			branch_code,
			name_line,
			address_line,
			locality,
			city,
			administrative_area,
			postal_code,
			country,
		},
		setData,
		handleSubmit,
		ctaName = 'Create',
	} = props;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = event;

		setData((prev: IProps['data']) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="page-content">
			<div className="form-margin">
				<div className="page-title">{formTitle}</div>
				<div className="column full-width">
					<div className="row full-width wrap space-between">
						<FormGroup label="Branch Code" className="flex-grow mr-input">
							<InputGroup
								name="branch_code"
								value={branch_code}
								placeholder="Branch Code"
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup label="Name" className="flex-grow">
							<InputGroup
								name="name_line"
								value={name_line}
								placeholder="1st Address Line"
								onChange={handleChange}
							/>
						</FormGroup>
					</div>
					<div className="row full-width wrap">
						<FormGroup label="Locality" className="flex-grow mr-input">
							<InputGroup
								placeholder="Locality"
								name="locality"
								value={locality}
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup label="Address" className="flex-grow">
							<InputGroup
								name="address_line"
								value={address_line}
								placeholder="2nd Address Line"
								onChange={handleChange}
							/>
						</FormGroup>
					</div>
					<div className="row full-width wrap">
						<FormGroup label="City" className="flex-grow mr-input">
							<InputGroup
								name="city"
								placeholder="City"
								value={city}
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup label="Postal Code" className="flex-grow">
							<InputGroup
								name="postal_code"
								value={postal_code}
								placeholder="Postal Code"
								onChange={handleChange}
							/>
						</FormGroup>
					</div>
					<div className="row full-width wrap">
						<FormGroup label="State/Province" className="flex-grow mr-input">
							<InputGroup
								name="administrative_area"
								value={administrative_area}
								placeholder="State/Province"
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup label="Country" className="flex-grow">
							{/* TODO: Add country select */}
							<InputGroup
								name="country"
								placeholder="Country"
								value={country}
								onChange={handleChange}
							/>
						</FormGroup>
					</div>
					<div className="row justify-center form-cta-margin">
						<Button
							intent="primary"
							outlined
							large
							className="quarter-width align-center"
							onClick={handleSubmit}
						>
							{ctaName}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BuildingForm;
