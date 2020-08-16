import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button } from '@blueprintjs/core';
import { useContext, SyntheticEvent } from 'react';
import { BuildingCtx } from '../../Context/BuildingContext';

interface Ward {
	id: string;
	ward_type: string;
	ward_number: number;
	floor: number;
	total_beds: number;
	occupied_beds: number;
}

const WSelect = Select.ofType<Ward>();

const renderWardItem: ItemRenderer<Ward> = (Ward: Ward, { handleClick, modifiers }) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	const simpleWardName = `${Ward.ward_type}-${Ward.ward_number}`;
	const floor = Ward.floor === 0 ? 'G' : `L${Ward.floor}`;

	return (
		<MenuItem
			active={modifiers.active}
			key={Ward.id}
			text={simpleWardName}
			onClick={handleClick}
			label={floor}
		/>
	);
};

interface GProps {
	id?: string;
	name?: string;
	activeItem: Ward;
	onItemSelect: (item: Ward, event?: SyntheticEvent<HTMLElement, Event>) => void;
}

const WardSelect = (props: GProps) => {
	const {
		ctx: { wards },
	} = useContext(BuildingCtx);

	const WardList = wards.map(({ id, ward_type, ward_number, floor, beds }) => ({
		id,
		ward_type,
		ward_number,
		floor,
		total_beds: beds.length,
		occupied_beds: beds.filter((bd) => bd.is_occupied).length,
	}));

	let { activeItem } = props;

	if (!activeItem) {
		activeItem = WardList[0];
	}

	const activeItemString = `${activeItem.ward_type}-${activeItem.ward_number}`;

	return (
		<WSelect {...props} itemRenderer={renderWardItem} items={WardList} filterable>
			<Button text={activeItemString} rightIcon="double-caret-vertical" />
		</WSelect>
	);
};

export default WardSelect;