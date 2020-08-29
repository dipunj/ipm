import { InputGroup, Checkbox, Button } from '@blueprintjs/core';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';
import PaymentModeSelect from '../Select/PaymentMode';
import TransactionTypeSelect from '../Select/TransactionType';
import { NewTxnContainer, TxnDiv } from './styles';
import { getCurrencySymbol } from '../../../helpers';
import request from '../../../library/Request';

interface INewTransaction {
	admission_id: string;
}

const NewTransaction = (props: INewTransaction): JSX.Element => {
	const {
		query: { admission_id },
	} = useRouter();
	const [newTransaction, setNewTransaction] = useState({
		id: null,
		purpose: null,
		payment_mode: null,
		value: 0.0,
		is_credit: null,
		is_settled: null,
	});

	const handleCreate = async () => {
		const params = {
			admission_id,
			...newTransaction,
		};
		const response = await request.post('/management/transaction/create', { ...params });

		if (response.data.success && response.data.is_authenticated) {
			// refetchList
		}
	};

	const onInputChange = (fieldName?: string) => {
		switch (fieldName) {
			case 'payment_mode':
				return (item: any, event?: SyntheticEvent<HTMLElement, Event>) => {
					setNewTransaction((prev) => ({
						...prev,
						[fieldName]: item.value,
					}));
				};
			case 'transaction_type':
				return (item: any, event?: SyntheticEvent<HTMLElement, Event>) => {
					setNewTransaction((prev) => ({
						...prev,
						is_credit: item.value === 'credit',
					}));
				};
			case 'is_settled':
				return (event: ChangeEvent<HTMLInputElement>) => {
					const {
						target: { checked },
					} = event;
					setNewTransaction((prev) => ({
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
					setNewTransaction((prev) => ({
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
					placeholder="Transaction Value"
					onChange={onInputChange()}
					style={{ textAlign: 'right' }}
					leftElement={
						<div className="row center">{getCurrencySymbol('en-IN', 'INR')}</div>
					}
				/>
			</TxnDiv>
			<TxnDiv>
				<TransactionTypeSelect
					activeItem={newTransaction.is_credit}
					onItemSelect={onInputChange('transaction_type')}
				/>
			</TxnDiv>
			<TxnDiv>
				<PaymentModeSelect
					activeItem={newTransaction.payment_mode}
					onItemSelect={onInputChange('payment_mode')}
				/>
			</TxnDiv>
			<TxnDiv>
				<Checkbox
					checked={newTransaction.is_settled}
					onChange={onInputChange('is_settled')}
					style={{ marginBottom: '0' }}
					label="Transaction Settled?"
				/>
			</TxnDiv>
			<TxnDiv>
				<InputGroup name="purpose" placeholder="Purpose" onChange={onInputChange()} />
			</TxnDiv>
			<TxnDiv>
				<Button fill intent="primary" onClick={handleCreate}>
					Add
				</Button>
			</TxnDiv>
		</NewTxnContainer>
	);
};

export default NewTransaction;
