import { useState } from 'react';
import { Button, Collapse } from '@blueprintjs/core';
import BedDetails from './BedDetails';
import { Container, WardName } from './styles';
import NewBedForm from '../NewBedForm';

interface IProps {
	wardData: {
		id: string;
		floor: string;
		ward_type: string;
		ward_number: string;
		name: string;
		building_id: string;
		beds: {
			id: string;
			name: string;
			ward_id: string;
			is_occupied: boolean;
		}[];
	};
	handleBedCreate: (ward_id: string, bedName: string) => void;
	handleBedDelete: (bed_id: string) => void;
	handleBedUpdate: (bed_id: string, bedName: string) => void;
	handleWardDelete: (ward_id: string) => void;
}

const WardCard = (props: IProps): JSX.Element => {
	const [show, setShow] = useState(false);
	const {
		wardData: { id: ward_id, name, beds },
		handleBedCreate,
		handleBedDelete,
		handleBedUpdate,
		handleWardDelete,
	} = props;

	const toggleShow = () => {
		setShow((prev) => !prev);
	};

	return (
		<Container>
			<WardName onClick={toggleShow}>{name}</WardName>
			<Collapse isOpen={show} keepChildrenMounted>
				<div className="row wrap bp3-card" style={{ marginBottom: '24px' }}>
					{beds.map((bed) => (
						<BedDetails
							key={bed.id}
							{...{ bedData: bed, handleBedDelete, handleBedUpdate }}
						/>
					))}
					<div className="row full-width space-between" style={{ margin: '16px' }}>
						<Button intent="danger" onClick={() => handleWardDelete(ward_id)}>
							Delete Ward
						</Button>
						<NewBedForm
							initialName={`B${beds.length + 1}`}
							ward_id={ward_id}
							handleCreateBed={handleBedCreate}
						/>
					</div>
				</div>
			</Collapse>
		</Container>
	);
};

export default WardCard;
