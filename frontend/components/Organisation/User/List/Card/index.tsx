import { Icon } from '@blueprintjs/core';
import { AccountType } from '../../../../../common/types';
import { IBuilding } from '../../../../../library/Select/Building';
import { Name, Type, Container } from './styles';

interface ICardProps {
	name: string;
	account_type: AccountType;
	login_id: string;
	is_active: boolean;
	buildings: IBuilding[];
}
const Card = (props: ICardProps) => {
	const { name, account_type, login_id, buildings, is_active } = props;

	return (
		<Container>
			<Name>{name}</Name>
			<Type>{login_id}</Type>
			<Type>{account_type}</Type>
			<Type>{buildings.length}</Type>
			<Type>
				<Icon
					icon={is_active ? 'tick-circle' : 'delete'}
					intent={is_active ? 'success' : 'danger'}
				/>
			</Type>
			<Type>actions</Type>
		</Container>
	);
};
export const HeaderCard = () => (
	<Container>
		<Name>Name</Name>
		<Type>Login ID</Type>
		<Type>Account Type</Type>
		<Type>Access To Buildings</Type>
		<Type>Account Status</Type>
		<Type>Actions</Type>
	</Container>
);

export default Card;
