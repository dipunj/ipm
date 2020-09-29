import { Button } from '@blueprintjs/core';
import { useState } from 'react';
import { HeaderCell, Cell, Row, HeaderRow } from './styles';

interface ICardProps {
	buildingData: {
		id: string;
		branch_code: string;
		name_line: string;
		address_line: string;
		locality: string;
		city: string;
		administrative_area: string;
		postal_code: string;
		country: string;
	};
	handleEdit: (building_id: string) => void;
	handleDelete: (building_id: string) => void;
	isDeletable: boolean;
}

const Card = (props: ICardProps): JSX.Element => {
	const [isHover, setIsHover] = useState(false);
	const {
		buildingData: { id, branch_code, name_line, city },
		handleDelete,
		handleEdit,
		isDeletable,
	} = props;

	const onEnter = () => setIsHover(() => true);
	const onExit = () => setIsHover(() => false);

	const onDelete = () => handleDelete(id);
	const onEdit = () => handleEdit(id);

	const hoverContent = (
		<>
			<div className="row justify-center">
				<Button minimal outlined icon="edit" className="mr-input" onClick={onEdit}>
					Edit
				</Button>
				{isDeletable && (
					<Button minimal outlined icon="trash" onClick={onDelete}>
						Delete
					</Button>
				)}
			</div>
		</>
	);

	const defaultContent = (
		<>
			<Cell>{name_line}</Cell>
			<Cell>{city}</Cell>
		</>
	);

	return (
		<Row onMouseOver={onEnter} onMouseOut={onExit}>
			<Cell capitalize={false}>{branch_code}</Cell>
			{isHover ? hoverContent : defaultContent}
		</Row>
	);
};

export const HeaderCard = (): JSX.Element => (
	<HeaderRow>
		<HeaderCell>Branch Code</HeaderCell>
		<HeaderCell>Name</HeaderCell>
		<HeaderCell>City</HeaderCell>
	</HeaderRow>
);

export default Card;
