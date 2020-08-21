import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import { useContext, SyntheticEvent } from 'react';
import { BuildingCtx } from '../../Context/BuildingContext';

interface Ward {
	id: string;
	name: string;
	floor: number;
	beds: any;
	total_beds: number;
	occupied_beds: number;
}

const WSelect = Select.ofType<Ward>();

const renderWardItem: ItemRenderer<Ward> = (Ward: Ward, { handleClick, modifiers }) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	const floor = Ward.floor === 0 ? 'G' : `L${Ward.floor}`;

	return (
		<MenuItem
			active={modifiers.active}
			key={Ward.id}
			text={Ward.name}
			onClick={handleClick}
			label={floor}
		/>
	);
};

interface GProps {
	id?: string;
	name?: string;
	activeItem: Ward;
	intent: Intent;
	onItemSelect: (item: Ward, event?: SyntheticEvent<HTMLElement, Event>) => void;
}

const WardSelect = (props: GProps) => {
	const {
		ctx: { wards },
	}: any = useContext(BuildingCtx);

	const WardList = wards.map(({ id, name, floor, beds }: Ward) => ({
		id,
		name,
		floor,
		total_beds: beds.length,
		occupied_beds: beds.filter((bd: { is_occupied: boolean }) => bd.is_occupied).length,
	}));

	const { activeItem } = props;
	const activeItemString = activeItem ? activeItem.name : 'Select';

	return (
		<WSelect {...props} itemRenderer={renderWardItem} items={WardList} filterable={false}>
			<Button
				intent={props.intent}
				text={activeItemString}
				rightIcon="double-caret-vertical"
			/>
		</WSelect>
	);
};

export default WardSelect;
