import { Checkbox } from '@blueprintjs/core';
import { withCurrency, dateFormatOptions } from '../../../../helpers';
import { PaymentMode_Value2Display } from '../../Select/PaymentMode/data';
import { HeaderCell, Cell, Row, HeaderRow } from './styles';

interface ICardProps {
	data: {
		id: string;
		is_deleted: string;
		is_credit: string;
		payment_mode: string;
		currency: string;
		value: string;
		is_settled: boolean;
		purpose: string;
		admission_id: string;
		updated_by: {
			id: string;
			name: string;
		};
		transaction_id: string;
		created_at: string;
	};
	onClick?: () => void;
}

const Card = (props: ICardProps) => {
	const {
		data: {
			is_credit,
			payment_mode,
			value,
			is_settled,
			purpose,
			updated_by: { name: updated_by },
			created_at,
		},
		onClick,
	} = props;

	const timestamp = new Date(created_at).toLocaleString('en-GB', dateFormatOptions);
	return (
		<Row className={onClick && 'clickable'} onClick={onClick}>
			<Cell>
				<Checkbox checked={is_settled} disabled />
			</Cell>
			<Cell>{is_credit ? 'Credit (+)' : 'Debit (-)'}</Cell>
			<Cell>{PaymentMode_Value2Display[payment_mode]}</Cell>
			<Cell>{withCurrency(value)}</Cell>
			<Cell>{purpose}</Cell>
			<Cell>{updated_by}</Cell>
			<Cell>{timestamp}</Cell>
		</Row>
	);
};

export const HeaderCard = ({ deleted = false }) => (
	<HeaderRow>
		<HeaderCell>Settled ?</HeaderCell>
		<HeaderCell>Payment Type</HeaderCell>
		<HeaderCell>Payment Mode</HeaderCell>
		<HeaderCell>Value</HeaderCell>
		<HeaderCell>Purpose</HeaderCell>
		<HeaderCell>{deleted ? 'Deleted' : 'Created'} By</HeaderCell>
		<HeaderCell>{deleted ? 'Deletion' : 'Snapshot'} Time</HeaderCell>
	</HeaderRow>
);

export default Card;
