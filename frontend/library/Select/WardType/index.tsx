import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import { SyntheticEvent } from 'react';
import { WardType } from '../../../common/types';

const WTSelect = Select.ofType<WardType>();

const renderWardTypeItem: ItemRenderer<WardType> = (
	wardType: WardType,
	{ handleClick, modifiers }
) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	const caseFixedWardType = wardType.charAt(0).toUpperCase() + wardType.slice(1).toLowerCase();
	return (
		<MenuItem
			active={modifiers.active}
			key={wardType}
			text={caseFixedWardType}
			onClick={handleClick}
		/>
	);
};

const wardTypeList: WardType[] = ['General', 'Luxury', 'Private', 'Semi-Private'];

interface WTProps {
	id?: string;
	name?: string;
	activeText?: string;
	activeItem?: WardType;
	intent: Intent;
	onItemSelect: (item: WardType, event?: SyntheticEvent<HTMLElement, Event>) => void;
}

const WardTypeSelect = (props: WTProps) => {
	const { activeText, activeItem, intent } = props;
	const selectedText = activeText || activeItem || 'Select';
	return (
		<WTSelect
			{...props}
			itemRenderer={renderWardTypeItem}
			items={wardTypeList}
			filterable={false}
		>
			<Button intent={intent} text={selectedText} rightIcon="double-caret-vertical" />
		</WTSelect>
	);
};

export default WardTypeSelect;
