import { Table, Column, Cell } from '@blueprintjs/table';
import { Checkbox } from '@blueprintjs/core';
import { useState } from 'react';
import { TableContainer } from './styles';
import { PaymentMode_Value2Display } from './Select/PaymentMode/data';
import NewTransaction from './NewTransaction';

interface Transaction {
	id: string;
	is_credit: boolean;
	payment_mode: string;
	currency: string;
	value: string;
	is_settled: boolean;
	purpose: string;
	reverses_transaction_id?: string;
	admission_id: string;
	updated_by: {
		id: string;
		name: string;
	};
	created_at: Date;
}

interface ITransactions {
	transactionsAPIResponse: {
		response: {
			data: Transaction[];
		};
	};
}

const dateFormatOptions = {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	hour12: true,
	hour: 'numeric',
	minute: 'numeric',
};

const INRCurrency = new Intl.NumberFormat('en-IN', {
	style: 'currency',
	currency: 'INR',
	minimumFractionDigits: 2,
});

const withCurrency = (value: string) => INRCurrency.format(parseFloat(value));

const getLayout = (list: Transaction[]) => [
	{
		name: 'Settled?',
		cellRender: (rowIndex: number) => {
			return (
				<Cell
					intent={list[rowIndex].is_settled ? 'success' : 'danger'}
					className="row center"
				>
					<Checkbox checked={list[rowIndex].is_settled} />
				</Cell>
			);
		},
	},
	{
		name: 'Payment Type',
		cellRender: (rowIndex: number) => {
			return (
				<Cell
					intent={list[rowIndex].is_settled ? 'success' : 'danger'}
					className="row center"
				>
					{list[rowIndex].is_credit ? 'Credit (+)' : 'Debit (-)'}
				</Cell>
			);
		},
	},
	{
		name: 'Payment Mode',
		cellRender: (rowIndex: number) => {
			return (
				<Cell
					intent={list[rowIndex].is_settled ? 'success' : 'danger'}
					className="row justify-end"
				>
					{PaymentMode_Value2Display[list[rowIndex].payment_mode]}
				</Cell>
			);
		},
	},
	{
		name: 'Value',
		cellRender: (rowIndex: number) => {
			return (
				<Cell
					intent={list[rowIndex].is_settled ? 'success' : 'danger'}
					className="row justify-end"
				>
					{withCurrency(list[rowIndex].value)}
				</Cell>
			);
		},
	},
	{
		name: 'Purpose',
		cellRender: (rowIndex: number) => {
			return (
				<Cell intent={list[rowIndex].is_settled ? 'success' : 'danger'} className="row">
					{list[rowIndex].purpose}
				</Cell>
			);
		},
	},
	{
		name: 'Created At',
		cellRender: (rowIndex: number) => {
			return (
				<Cell
					intent={list[rowIndex].is_settled ? 'success' : 'danger'}
					className="row justify-end"
				>
					{new Date(list[rowIndex].created_at).toLocaleString('en-US', dateFormatOptions)}
				</Cell>
			);
		},
	},
	{
		name: 'Created By',
		cellRender: (rowIndex: number) => {
			return (
				<Cell intent={list[rowIndex].is_settled ? 'success' : 'danger'} className="row">
					{list[rowIndex].updated_by.name}
				</Cell>
			);
		},
	},
];

const Transactions = (props: ITransactions): JSX.Element => {
	const {
		transactionsAPIResponse: {
			response: { data: list },
		},
	} = props;
	const [columnNames, setColumnNames] = useState(getLayout(list));

	// const constCols = getLayout(list);

	const onColumnReordering = (oldIndex: number, newIndex: number, _length: number) => {
		const { [oldIndex]: original, [newIndex]: target } = columnNames;
		console.log(original, target);
		setColumnNames((prev) => {
			const newArray = [...prev];
			newArray[newIndex] = original;
			newArray[oldIndex] = target;
			return newArray;
		});
	};

	// return prettyJSON(props);
	return (
		<div>
			<TableContainer>
				<Table
					numRows={list.length}
					enableColumnReordering
					onColumnsReordered={onColumnReordering}
				>
					{columnNames.map((col) => (
						<Column key={col.name} name={col.name} cellRenderer={col.cellRender} />
					))}
				</Table>
				<NewTransaction />
			</TableContainer>
		</div>
	);
};

export default Transactions;
