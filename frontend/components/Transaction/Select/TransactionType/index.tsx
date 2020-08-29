import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import { SyntheticEvent } from 'react';
import TransactionTypeList, { TransactionType_Value2Display } from './data';

interface ITransactionType {
	displayText: string;
	value: string;
}

const TxnTypeSelect = Select.ofType<ITransactionType>();

const renderTTItem: ItemRenderer<ITransactionType> = (
	transactionType: ITransactionType,
	{ handleClick, modifiers }
) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	return (
		<MenuItem
			active={modifiers.active}
			key={transactionType.value}
			text={transactionType.displayText}
			onClick={handleClick}
		/>
	);
};

interface PMProps {
	activeItem: boolean;
	onItemSelect: (item: ITransactionType, event?: SyntheticEvent<HTMLElement, Event>) => void;
}

const TransactionTypeSelect = (props: PMProps): JSX.Element => {
	const { activeItem } = props;

	const activeItemString =
		activeItem !== null
			? TransactionType_Value2Display[activeItem ? 'credit' : 'debit']
			: 'Transaction Type';

	const intent = activeItem !== null ? (activeItem ? 'success' : 'danger') : 'none';

	return (
		<TxnTypeSelect
			{...props}
			popoverProps={{ position: 'top' }}
			itemRenderer={renderTTItem}
			items={TransactionTypeList}
			filterable={false}
		>
			<Button outlined fill intent={intent} minimal text={activeItemString} icon="dot" />
		</TxnTypeSelect>
	);
};

export default TransactionTypeSelect;
