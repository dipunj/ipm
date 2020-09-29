import { InputGroup, Checkbox, Button } from '@blueprintjs/core';
import { SyntheticEvent, useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import PaymentModeSelect from '../Select/PaymentMode';
import TransactionTypeSelect, { ITransactionType } from '../Select/TransactionType';
import { NewTxnContainer, TxnDiv } from './styles';
import { getCurrencySymbol } from '../../../helpers';
import request from '../../../library/Request';
import { handleErrorToast } from '../../../library/Toaster';

export interface INewTransaction {
	id: string | null;
	purpose?: string | null;
	payment_mode?: string | null;
	value: number | string;
	is_credit?: boolean | null;
	is_settled?: boolean;
}

const NewTransaction = ({ refetch }: { refetch: () => void }): JSX.Element => {
	const {
		query: { admission_id },
	} = useRouter();
	const [newTransaction, setNewTransaction]: [
		INewTransaction,
		Dispatch<SetStateAction<any>>
	] = useState({
		id: null,
		purpose: null,
		payment_mode: null,
		value: '',
		is_credit: null,
		is_settled: undefined,
	});

	const handleCreate = async () => {
		try {
			const params = {
				admission_id,
				...newTransaction,
			};
			const response = await request.post('/management/transaction/create', { ...params });

			if (response.data.success && response.data.is_authenticated) {
				refetch();
			}
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const onInputChange = (fieldName?: string): any => {
		switch (fieldName) {
			case 'payment_mode':
				return (item: ITransactionType, _event?: SyntheticEvent<HTMLElement, Event>) => {
					setNewTransaction((prev: INewTransaction) => ({
						...prev,
						[fieldName]: item.value,
					}));
				};
			case 'transaction_type':
				return (item: ITransactionType, _event?: SyntheticEvent<HTMLElement, Event>) => {
					setNewTransaction((prev: INewTransaction) => ({
						...prev,
						is_credit: item.value === 'credit',
					}));
				};
			case 'is_settled':
				return (event: ChangeEvent<HTMLInputElement>) => {
					const {
						target: { checked },
					} = event;
					setNewTransaction((prev: INewTransaction) => ({
						...prev,
						is_settled: checked,
					}));
				};
			default:
				// for input tags
				return (event: ChangeEvent<HTMLInputElement>) => {
					const {
						target: { name, value },
					} = event;
					setNewTransaction((prev: INewTransaction) => ({
						...prev,
						[name]: value,
					}));
				};
		}
	};

	return (
		<NewTxnContainer>
			<TxnDiv>
				<InputGroup
					name="value"
					type="number"
					min={0}
					placeholder="Transaction Value"
					onChange={onInputChange()}
					style={{ textAlign: 'right' }}
					value={(newTransaction.value as unknown) as string}
					step={100}
					leftElement={
						<div
							style={{ cursor: 'default', background: 'var(--background-secondary)' }}
							className="row center bp3-input"
						>
							{getCurrencySymbol('en-IN', 'INR')}
						</div>
					}
				/>
			</TxnDiv>
			<TxnDiv>
				<TransactionTypeSelect
					popoverPosition="top"
					activeItem={newTransaction.is_credit}
					onItemSelect={onInputChange('transaction_type')}
				/>
			</TxnDiv>
			<TxnDiv>
				<PaymentModeSelect
					popoverPosition="top"
					activeItem={newTransaction.payment_mode}
					onItemSelect={onInputChange('payment_mode')}
				/>
			</TxnDiv>
			<TxnDiv>
				<Checkbox
					checked={newTransaction.is_settled}
					onChange={onInputChange('is_settled')}
					style={{ marginBottom: '0' }}
					label="Settled"
				/>
			</TxnDiv>
			<TxnDiv>
				<InputGroup name="purpose" placeholder="Purpose" onChange={onInputChange()} />
			</TxnDiv>
			<TxnDiv>
				<Button fill intent="primary" onClick={handleCreate}>
					Add Transaction
				</Button>
			</TxnDiv>
		</NewTxnContainer>
	);
};

export default NewTransaction;
