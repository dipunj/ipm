import { Icon, FormGroup, InputGroup, Label } from '@blueprintjs/core';
import { ChangeEvent, useEffect, useState } from 'react';

interface IProps {
	initialName: string;
	ward_id: string;
	handleCreateBed: (ward_id: string, bedName: string) => void;
}

const NewBedForm = ({ initialName = '', ward_id, handleCreateBed }: IProps): JSX.Element => {
	const [name, setName] = useState(initialName);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	useEffect(() => {
		setName(initialName);
	}, [initialName]);

	return (
		<div className="row">
			<FormGroup inline label="New Bed">
				<div className="row align-center">
					<InputGroup placeholder="Bed Name/ID" value={name} onChange={handleChange} />
					<Icon
						intent="primary"
						icon="add"
						style={{ marginLeft: '12px', cursor: 'pointer' }}
						onClick={() => handleCreateBed(ward_id, name)}
					/>
				</div>
			</FormGroup>
		</div>
	);
};

export default NewBedForm;
