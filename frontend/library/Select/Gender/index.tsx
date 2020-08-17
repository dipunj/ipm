import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import { SyntheticEvent } from 'react';
import { Gender } from '../../../common/types';

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

const genderList: Gender[] = ['male', 'female', 'other'];

interface GProps {
	id?: string;
	name?: string;
	activeText?: string;
	activeItem: Gender;
	intent: Intent;
	onItemSelect: (item: Gender, event?: SyntheticEvent<HTMLElement, Event>) => void;
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
