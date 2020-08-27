import { Table, Column, Cell, EditableCell } from '@blueprintjs/table';
import { Icon } from '@blueprintjs/core';
import { useState } from 'react';
import { TableContainer } from './styles';
import { prettyJSON } from '../../../../helpers';

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
		updated_by: {
			id: string;
			name: string;
		};
		created_at: Date;
	}[];
}

const dateFormatOptions = {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	hour12: true,
	hour: 'numeric',
	minute: 'numeric',
};

const Transactions = (props: ITransactions): JSX.Element => {
	const { list } = props;

	const ColumnNames = [
		{
			name: 'Created At',
			cellRender: (rowIndex: number) => {
				return (
					<Cell>
						{new Date(list[rowIndex].created_at).toLocaleString(
							'en-US',
							dateFormatOptions
						)}
					</Cell>
				);
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
		{
			name: 'Created By',
			cellRender: (rowIndex: number) => {
				return <Cell>{list[rowIndex].updated_by.name}</Cell>;
			},
		},
	];

	const [newTransaction, setNewTransaction] = useState({
		purpose: '',
		payment_mode: 'cash',
		payment_type: 'credit',
		value: 0.0,
		is_settled: true,
	});
	const onCellInputChange = (fieldName: string) => (value: string) => {
		setNewTransaction((prev) => ({
			...prev,
			[fieldName]: value,
		}));
	};

	const NewTransactionForm = [
		{
			name: 'Created At',
			cellRender: (_rowIndex: number) => {
				return <Cell>{new Date().toLocaleString('en-US', dateFormatOptions)}</Cell>;
			},
		},
		{
			name: 'Purpose',
			cellRender: (_rowIndex: number) => {
				return (
					<EditableCell
						value={newTransaction.purpose}
						onChange={onCellInputChange('purpose')}
					/>
				);
			},
		},
		{
			name: 'Payment Mode',
			cellRender: (_rowIndex: number) => {
				return (
					<EditableCell
						value={newTransaction.payment_mode}
						onChange={onCellInputChange('payment_mode')}
					/>
				);
			},
		},
		{
			name: 'Type',
			cellRender: (_rowIndex: number) => {
				return (
					<EditableCell
						value={newTransaction.payment_type}
						onChange={onCellInputChange('payment_type')}
					/>
				);
			},
		},
		{
			name: 'Value',
			cellRender: (_rowIndex: number) => {
				return (
					<EditableCell
						value={newTransaction.value}
						onChange={onCellInputChange('value')}
					/>
				);
			},
		},
		{
			name: 'Settled?',
			cellRender: (_rowIndex: number) => {
				return (
					<EditableCell
						value={newTransaction.is_settled ? 'Yes' : 'No'}
						onChange={onCellInputChange('is_settled')}
					/>
				);
			},
		},
		{
			name: 'Created By',
			cellRender: (_rowIndex: number) => {
				return <Cell>You</Cell>;
			},
		},
	];

	return (
		<TableContainer>
			<Table numRows={list.length}>
				{ColumnNames.map((col) => (
					<Column key={col.name} name={col.name} cellRenderer={col.cellRender} />
				))}
			</Table>
			<Table numRows={1}>
				{NewTransactionForm.map((col) => (
					<Column key={col.name} name={col.name} cellRenderer={col.cellRender} />
				))}
			</Table>
			{prettyJSON(newTransaction)}
		</TableContainer>
	);
};

export default Transactions;
