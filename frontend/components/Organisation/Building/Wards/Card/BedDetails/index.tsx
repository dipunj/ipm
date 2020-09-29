import { InputGroup, Icon } from '@blueprintjs/core';
import { ChangeEvent, useState } from 'react';

interface IProps {
	bedData: {
		id: string;
		name: string;
		ward_id: string;
		is_occupied: boolean;
	};
	handleBedDelete: (bed_id: string) => void;
	handleBedUpdate: (bed_id: string, bedName: string) => void;
}

const BedDetails = (props: IProps): JSX.Element => {
	const {
		bedData: { id: bed_id, name: bedName },
		handleBedDelete,
		handleBedUpdate,
	} = props;
	const [isEdit, setIsEdit] = useState(false);
	const [name, setName] = useState(bedName);
	const toggleEdit = () => setIsEdit((prev) => !prev);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;
		setName(value);
	};

	if (isEdit) {
		return (
			<div
				className="row align-center space-between"
				style={{
					margin: '4px 16px',
					padding: '8px',
					border: '1px solid var(--border-color-light)',
					borderRadius: '12px',
				}}
			>
				<InputGroup
					name="bedname"
					value={name}
					onChange={handleChange}
					className="mr-input"
				/>
				<div>
					<Icon intent="danger" icon="cross" onClick={toggleEdit} className="mr-input" />
					<Icon
						icon="tick"
						intent="success"
						onClick={() => handleBedUpdate(bed_id, name)}
					/>
				</div>
			</div>
		);
	}

	return (
		<div
			className="row align-center space-between"
			style={{
				margin: '8px 16px',
				padding: '8px',
				border: '1px solid var(--border-color-light)',
				borderRadius: '12px',
			}}
		>
			<div className="mr-input">{name}</div>
			<div>
				<Icon
					intent="primary"
					onClick={toggleEdit}
					icon="edit"
					style={{ marginRight: '12px' }}
				/>
				<Icon intent="danger" onClick={() => handleBedDelete(bed_id)} icon="trash" />
			</div>
		</div>
	);
};

export default BedDetails;
