import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, PopoverPosition } from '@blueprintjs/core';
import { SyntheticEvent } from 'react';
import PaymentModeList, { PaymentMode_Value2Display } from './data';

export interface IPaymentMode {
	displayText: string;
	value: string;
}

const PMSelect = Select.ofType<IPaymentMode>();

const renderPMItem: ItemRenderer<IPaymentMode> = (
	paymentType: IPaymentMode,
	{ handleClick, modifiers }
) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	return (
		<MenuItem
			active={modifiers.active}
			key={paymentType.value}
			text={paymentType.displayText}
			onClick={handleClick}
		/>
	);
};

interface PMProps {
	activeItem: string | null;
	onItemSelect: (item: IPaymentMode, event?: SyntheticEvent<HTMLElement, Event>) => void;
	showButton?: boolean;
	children?: JSX.Element[];
	popoverPosition: PopoverPosition;
}

const PaymentModeSelect = (props: PMProps): JSX.Element => {
	const {
		popoverPosition = 'auto',
		showButton = true,
		children,
		activeItem,
		onItemSelect,
	} = props;
	const activeItemString: string = activeItem
		? PaymentMode_Value2Display[activeItem]
		: 'Payment Mode';

	const intent = activeItem ? 'primary' : 'none';

	return (
		<PMSelect
			popoverProps={{ position: popoverPosition }}
			onItemSelect={onItemSelect}
			itemRenderer={renderPMItem}
			items={PaymentModeList}
			filterable={false}
		>
			{!showButton ? (
				children
			) : (
				<Button outlined fill intent={intent} minimal text={activeItemString} icon="dot" />
			)}{' '}
		</PMSelect>
	);
};

export default PaymentModeSelect;
