import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, PopoverPosition } from '@blueprintjs/core';
import TransactionTypeList, { TransactionType_Value2Display } from './data';

export interface ITransactionType {
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
	activeItem: boolean | null;
	onItemSelect: any;
	showButton?: boolean;
	children?: JSX.Element;
	popoverPosition: PopoverPosition;
}

const TransactionTypeSelect = (props: PMProps): JSX.Element => {
	const {
		popoverPosition = 'auto',
		showButton = true,
		children,
		onItemSelect,
		activeItem,
	} = props;

	const activeItemString =
		activeItem !== null
			? TransactionType_Value2Display[activeItem ? 'credit' : 'debit']
			: 'Transaction Type';

	const intent = activeItem !== null ? (activeItem ? 'success' : 'danger') : 'none';

	return (
		<TxnTypeSelect
			onItemSelect={onItemSelect}
			popoverProps={{ position: popoverPosition }}
			itemRenderer={renderTTItem}
			items={TransactionTypeList}
			filterable={false}
		>
			{!showButton ? (
				children
			) : (
				<Button outlined fill intent={intent} minimal text={activeItemString} icon="dot" />
			)}
		</TxnTypeSelect>
	);
};

export default TransactionTypeSelect;
