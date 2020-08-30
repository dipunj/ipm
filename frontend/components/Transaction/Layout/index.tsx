import { Cell, EditableCell } from '@blueprintjs/table';
import { Checkbox } from '@blueprintjs/core';
import { useState, useEffect } from 'react';
import TransactionTypeSelect from '../Select/TransactionType';
import PaymentModeSelect from '../Select/PaymentMode';
import { PaymentMode_Value2Display } from '../Select/PaymentMode/data';
import { dateFormatOptions } from '../../../helpers';
import { INewTransaction } from '../NewTransaction';

export interface Transaction {
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

const defaultTransactionData: INewTransaction = {
	id: null,
	purpose: null,
	payment_mode: null,
	value: 0.0,
	is_credit: null,
	is_settled: undefined,
};

const INRCurrency = new Intl.NumberFormat('en-IN', {
	style: 'currency',
	currency: 'INR',
	minimumFractionDigits: 2,
});

const withCurrency = (value: string) => INRCurrency.format(parseFloat(value));

const useLayout = (list: Transaction[]): any => {
	const [modifyRow, setModifyRow] = useState(-1);
	const [modifyData, setModifyData] = useState(defaultTransactionData);

	const setEditRow = async (rowIndex: number) => {
		if (rowIndex < 0) {
			setModifyRow(-1);
			return;
		}
		const { id, value, purpose, comment, payment_mode, is_credit, is_settled } = list[rowIndex];
		await setModifyData({
			id,
			value,
			purpose,
			comment,
			payment_mode,
			is_credit,
			is_settled,
		});
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

	return {
		columns: [
			{
				name: 'Settled?',
				cellRender: (rowIndex: number) => {
					if (rowIndex === modifyRow) {
						return (
							<Cell
								interactive
								intent="none"
								className="row center"
								key={`${rowIndex},settled`}
							>
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
							key={`${rowIndex},settled`}
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
							<Cell
								intent="none"
								className="row center"
								interactive
								key={`${rowIndex},pt`}
							>
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
							key={`${rowIndex},pt`}
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
							<Cell key={`${rowIndex},pm`} intent="none" className="row center">
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
							key={`${rowIndex},pm`}
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
							<EditableCell
								key={`${rowIndex},value`}
								intent="none"
								className="row center"
								value={modifyData.value}
								onConfirm={onModifyDataChange('value')}
							/>
						);
					}
					return (
						<Cell
							key={`${rowIndex},value`}
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
								key={`${rowIndex},purpose`}
								intent="none"
								className="row center"
								onConfirm={onModifyDataChange('purpose')}
								value={modifyData.purpose}
							/>
						);
					}
					return (
						<Cell
							key={`${rowIndex},purpose`}
							intent={list[rowIndex].is_settled ? 'success' : 'danger'}
							className="row"
						>
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
							{new Date(list[rowIndex].created_at).toLocaleString(
								'en-US',
								dateFormatOptions
							)}
						</Cell>
					);
				},
			},
			{
				name: 'Created By',
				cellRender: (rowIndex: number) => {
					return (
						<Cell
							intent={list[rowIndex].is_settled ? 'success' : 'danger'}
							className="row"
						>
							{list[rowIndex].updated_by.name}
						</Cell>
					);
				},
			},
			{
				name: 'Actions',
				cellRender: (rowIndex: number) => {
					return (
						<Cell
							intent={list[rowIndex].is_settled ? 'success' : 'danger'}
							className="row"
						>
							{rowIndex === modifyRow ? (
								<div
									className="row full-width space-between"
									style={{ width: '100px' }}
								>
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
		],
		modifyRow,
	};
};

export default useLayout;
