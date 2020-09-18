import { Button, Icon } from '@blueprintjs/core';
import { useState } from 'react';
import { AccountType } from '../../../../../common/types';
import { IBuilding } from '../../../../../library/Select/Building';
import { HeaderCell, Cell, Row, HeaderRow } from './styles';

interface ICardProps {
	userData: {
		id: string;
		name: string;
		account_type: AccountType;
		login_id: string;
		is_active: boolean;
		buildings: IBuilding[];
	};
	handleEdit: (user_id: string) => void;
	handleDelete: (user_id: string) => void;
}
const Card = (props: ICardProps) => {
	const [isHover, setIsHover] = useState(false);
	const {
		userData: { id, name, account_type, login_id, buildings, is_active },
		handleDelete,
		handleEdit,
	} = props;

	const isSysAdmin = login_id === 'admin';
	const onEnter = () => !isSysAdmin && setIsHover(() => true);
	const onExit = () => !isSysAdmin && setIsHover(() => false);

	const onDelete = () => handleDelete(id);
	const onEdit = () => handleEdit(id);

	const hoverContent = (
		<>
			<div className="row justify-center">
				<Button minimal outlined icon="edit" className="mr-input" onClick={onEdit}>
					Edit
				</Button>
				<Button minimal outlined icon={is_active ? 'lock' : 'unlock'} onClick={onDelete}>
					{is_active ? 'Deactivate' : 'Re-Activate'}
				</Button>
			</div>
		</>
	);

	const defaultContent = (
		<>
			<Cell capitalize={false}>{login_id}</Cell>
			<Cell>{account_type}</Cell>
			<Cell className="row justify-center">{buildings.length}</Cell>
			<Cell className="row justify-center">
				<Icon
					icon={is_active ? 'tick-circle' : 'delete'}
					intent={is_active ? 'success' : 'danger'}
				/>
			</Cell>
		</>
	);

	return (
		<Row onMouseOver={onEnter} onMouseOut={onExit}>
			<Cell>{name}</Cell>
			{isHover ? hoverContent : defaultContent}
		</Row>
	);
};
export const HeaderCard = () => (
	<HeaderRow>
		<HeaderCell>Name</HeaderCell>
		<HeaderCell>Login ID</HeaderCell>
		<HeaderCell>Account Type</HeaderCell>
		<HeaderCell textCenter>Buildings</HeaderCell>
		<HeaderCell textCenter>Account Status</HeaderCell>
	</HeaderRow>
);

export default Card;
