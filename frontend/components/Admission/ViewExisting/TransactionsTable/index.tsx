import { Table, Column, Cell } from '@blueprintjs/table';
import { Icon } from '@blueprintjs/core';

interface ITransactions {
	list: {
		id: string;
		is_credit: boolean;
		payment_mode: string;
		currency: string;
		value: string;
		is_settled: boolean;
		purpose: string;
		reverses_transaction_id?: string;
		admission_id: string;
		created_by: {
			id: string;
			name: string;
		};
		created_at: Date;
	}[];
}

const Transactions = (props: ITransactions): JSX.Element => {
	const { list } = props;

	const ColumnNames = [
		{
			name: 'Created At',
			cellRender: (rowIndex: number) => {
				return <Cell>{new Date(list[rowIndex].created_at).toLocaleString()}</Cell>;
			},
		},
		{
			name: 'Created By',
			cellRender: (rowIndex: number) => {
				return <Cell>{list[rowIndex].created_by.name}</Cell>;
			},
		},
		{
			name: 'Purpose',
			cellRender: (rowIndex: number) => {
				return <Cell>{list[rowIndex].purpose}</Cell>;
			},
		},
		{
			name: 'Payment Mode',
			cellRender: (rowIndex: number) => {
				return <Cell>{list[rowIndex].payment_mode}</Cell>;
			},
		},
		{
			name: 'Type',
			cellRender: (rowIndex: number) => {
				return (
					<Cell>{list[rowIndex].is_credit ? <div>credit</div> : <div>debit</div>}</Cell>
				);
			},
		},
		{
			name: 'Value',
			cellRender: (rowIndex: number) => {
				return <Cell>{list[rowIndex].value}</Cell>;
			},
		},
		{
			name: 'Settled?',
			cellRender: (rowIndex: number) => {
				return <Cell>{list[rowIndex].is_settled ? 'Yes' : 'No'}</Cell>;
			},
		},
	];
	return (
		<Table numRows={list.length}>
			{ColumnNames.map((col) => (
				<Column key={col.name} name={col.name} cellRenderer={col.cellRender} />
			))}
		</Table>
	);
};

export default Transactions;
