import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import { SyntheticEvent } from 'react';
import { AccountType } from '../../../common/types';

const ATSelect = Select.ofType<AccountType>();

const renderAccountTypeItem: ItemRenderer<AccountType> = (
	type: AccountType,
	{ handleClick, modifiers }
) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	const caseFixedAccountType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
	return (
		<MenuItem
			active={modifiers.active}
			key={type}
			text={caseFixedAccountType}
			onClick={handleClick}
		/>
	);
};

const AccountTypeList: AccountType[] = ['admin', 'manager', 'operator'];

interface ATProps {
	id?: string;
	name?: string;
	activeText?: string;
	activeItem: AccountType;
	intent: Intent;
	onItemSelect: (item: AccountType, event?: SyntheticEvent<HTMLElement, Event>) => void;
}

const AccountTypeSelect = (props: ATProps) => {
	const { activeItem, activeText, intent } = props;
	let selectedText = activeText || activeItem || 'Select';
	selectedText = selectedText.charAt(0).toUpperCase() + selectedText.slice(1);

	return (
		<ATSelect
			{...props}
			itemRenderer={renderAccountTypeItem}
			items={AccountTypeList}
			filterable={false}
		>
			<Button intent={intent} text={selectedText} rightIcon="double-caret-vertical" />
		</ATSelect>
	);
};

export default AccountTypeSelect;
