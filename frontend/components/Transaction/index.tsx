import { Table, Column, Cell, EditableCell, SelectionModes } from '@blueprintjs/table';
import { Checkbox, Button, InputGroup, Icon } from '@blueprintjs/core';
import { useState, SyntheticEvent, useDebugValue, useEffect } from 'react';
import { TableContainer } from './styles';
import { PaymentMode_Value2Display } from './Select/PaymentMode/data';
import NewTransaction, { INewTransaction } from './NewTransaction';
import useFetch from '../../library/hooks/fetch';
import TransactionTypeSelect from './Select/TransactionType';
import PaymentModeSelect from './Select/PaymentMode';
import { getCurrencySymbol } from '../../helpers';

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
	admission_id: string;
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

const getLayout = (
	list: Transaction[],
	modifyData: Transaction,
	onModifyDataChange: (field: string) => void,
	modifyRow: number | null,
	setEditRow: (rowIndex: number) => void
) => [
	{
		name: 'Settled?',
		cellRender: (rowIndex: number) => {
			if (rowIndex === modifyRow) {
				return (
					<Cell interactive intent="none" className="row center">
						<Checkbox
							checked={modifyData.is_settled}
							onChange={onModifyDataChange('is_settled')}
						/>
					</Cell>
				);
			}
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
			if (rowIndex === modifyRow) {
				return (
					<Cell intent="none" className="row center" interactive>
						<TransactionTypeSelect
							showButton={false}
							activeItem={modifyData.is_credit}
							onItemSelect={onModifyDataChange('transaction_type')}
						>
							{modifyData.is_credit ? 'Credit (+)' : 'Debit (-)'}
						</TransactionTypeSelect>
					</Cell>
				);
			}
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
			if (rowIndex === modifyRow) {
				return (
					<Cell intent="none" className="row center">
						<PaymentModeSelect
							showButton={false}
							activeItem={modifyData.payment_mode}
							onItemSelect={onModifyDataChange('payment_mode')}
						>
							{PaymentMode_Value2Display[modifyData.payment_mode]}
						</PaymentModeSelect>
					</Cell>
				);
			}
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
			if (rowIndex === modifyRow) {
				return (
					<EditableCell intent="none" className="row center" value={modifyData.value} />
				);
			}
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
			if (rowIndex === modifyRow) {
				return (
					<EditableCell
						intent="none"
						className="row center"
						value={modifyData.purpose}
						onChange={onModifyDataChange('purpose')}
					/>
				);
			}
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
	{
		name: 'Actions',
		cellRender: (rowIndex: number) => {
			return (
				<Cell intent={list[rowIndex].is_settled ? 'success' : 'danger'} className="row">
					{rowIndex === modifyRow ? (
						<div className="row full-width space-between" style={{ width: '100px' }}>
							<div>
								<a onClick={() => setEditRow(-1)}>Cancel</a>
							</div>
							<div>
								<a onClick={() => makeUpdate()}>Update</a>
							</div>
						</div>
					) : (
						<a onClick={() => setEditRow(rowIndex)}>Modify</a>
					)}
				</Cell>
			);
		},
	},
];

const defaultTransactionData: INewTransaction = {
	id: null,
	purpose: null,
	payment_mode: null,
	value: 0.0,
	is_credit: null,
	is_settled: undefined,
};

const Transactions = (props: ITransactions): JSX.Element => {
	const { loading, data: list, refetch } = useFetch('/management/transaction/list', {
		params: { admission_id: props.admission_id },
	});

	// const onColumnReordering = (oldIndex: number, newIndex: number, _length: number) => {
	// 	const { [oldIndex]: original, [newIndex]: target } = columnNames;
	// 	setColumnNames((prev) => {
	// 		const newArray = [...prev];
	// 		newArray[newIndex] = original;
	// 		newArray[oldIndex] = target;
	// 		return newArray;
	// 	});
	// };

	const [modifyRow, setModifyRow] = useState(-1);
	const [modifyData, setModifyData] = useState(defaultTransactionData);

	if (loading) {
		return <div>loading...</div>;
	}

	const setEditRow = async (rowIndex: number) => {
		if (rowIndex >= 0) {
			const { id, value, purpose, comment, payment_mode, is_credit, is_settled } = list[
				rowIndex
			];
			await setModifyData({
				id,
				value,
				purpose,
				comment,
				payment_mode,
				is_credit,
				is_settled,
			});
		}
		setModifyRow(rowIndex);
	};

	const onModifyDataChange = (fieldName: string): any => {
		switch (fieldName) {
			case 'payment_mode':
				return (item: ITransactionType, _event?: SyntheticEvent<HTMLElement, Event>) => {
					setModifyData((prev: INewTransaction) => ({
						...prev,
						[fieldName]: item.value,
					}));
				};
			case 'transaction_type':
				return (item: ITransactionType, _event?: SyntheticEvent<HTMLElement, Event>) => {
					setModifyData((prev: INewTransaction) => ({
						...prev,
						is_credit: item.value === 'credit',
					}));
				};
			case 'is_settled':
				return (event: ChangeEvent<HTMLInputElement>) => {
					const {
						target: { checked },
					} = event;
					setModifyData((prev: INewTransaction) => ({
						...prev,
						is_settled: checked,
					}));
				};
			default:
				// for input tags
				return (value: string, rowIndex?: number, columnIndex?: number) => {
					setModifyData((prev: INewTransaction) => ({
						...prev,
						[fieldName]: value,
					}));
				};
		}
	};

	return (
		<div>
			<TableContainer>
				<Table
					numRows={list.length}
					// enableColumnReordering
					// onColumnsReordered={onColumnReordering}
					enableFocusedCell={modifyRow < 0}
				>
					{getLayout(list, modifyData, onModifyDataChange, modifyRow, setEditRow).map(
						(col) => (
							<Column key={col.name} name={col.name} cellRenderer={col.cellRender} />
						)
					)}
				</Table>
				<NewTransaction refetch={refetch} />
			</TableContainer>
		</div>
	);
};

export default Transactions;
