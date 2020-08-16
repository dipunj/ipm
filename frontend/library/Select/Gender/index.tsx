import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import { FormEvent } from 'react';

const GSelect = Select.ofType<Gender>();

const renderGenderItem: ItemRenderer<Gender> = (gender: Gender, { handleClick, modifiers }) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	const caseFixedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
	return (
		<MenuItem
			active={modifiers.active}
			key={gender}
			text={caseFixedGender}
			onClick={handleClick}
		/>
	);
};

const genderList = ['male', 'female', 'other'];

interface GProps {
	id?: string;
	name?: string;
	activeText?: string;
	activeItem: Gender;
	intent: Intent;
	onItemSelect: (value: string, event: FormEvent<HTMLElement>) => void;
}

const GenderSelect = (props: GProps) => {
	const selectedText = props.activeText || props.activeItem || 'Select';
	return (
		<GSelect {...props} itemRenderer={renderGenderItem} items={genderList} filterable={false}>
			<Button intent={props.intent} text={selectedText} rightIcon="double-caret-vertical" />
		</GSelect>
	);
};

export default GenderSelect;
