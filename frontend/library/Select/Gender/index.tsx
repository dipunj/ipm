import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';

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

const GenderSelect = (props) => {
	return (
		<GSelect {...props} itemRenderer={renderGenderItem} items={genderList} filterable={false} />
	);
};

export default GenderSelect;
