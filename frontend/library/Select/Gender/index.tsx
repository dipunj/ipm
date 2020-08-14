import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button } from '@blueprintjs/core';
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
	onItemSelect: (value: string, event: FormEvent<HTMLElement>) => void;
}

const GenderSelect = (props: GProps) => {
	return (
		<GSelect {...props} itemRenderer={renderGenderItem} items={genderList} filterable={false}>
			<Button
				text={props.activeText || props.activeItem.charAt(0).toUpperCase()}
				rightIcon="double-caret-vertical"
			/>
		</GSelect>
	);
};

export default GenderSelect;
