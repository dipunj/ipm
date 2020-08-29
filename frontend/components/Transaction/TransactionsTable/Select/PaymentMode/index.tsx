import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import { SyntheticEvent } from 'react';
import PaymentModeList, { PaymentMode_Value2Display } from './data';

interface IPaymentMode {
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
	activeItem: string;
	onItemSelect: (item: IPaymentMode, event?: SyntheticEvent<HTMLElement, Event>) => void;
}

const PaymentTypeSelect = (props: PMProps): JSX.Element => {
	const { activeItem } = props;
	const activeItemString = activeItem ? PaymentMode_Value2Display[activeItem] : 'Payment Mode';

	const intent = activeItem ? 'primary' : 'none';

	return (
		<PMSelect {...props} itemRenderer={renderPMItem} items={PaymentModeList} filterable={false}>
			<Button outlined fill intent={intent} minimal text={activeItemString} icon="dot" />
		</PMSelect>
	);
};

export default PaymentTypeSelect;
