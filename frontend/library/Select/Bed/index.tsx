import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import { useContext, SyntheticEvent } from 'react';
import { BuildingCtx } from '../../Context/BuildingContext';

interface Bed {
	id: string;
	name: string;
	ward_display_name: string;
	is_occupied: boolean;
}

const BSelect = Select.ofType<Bed>();

const renderWardItem: ItemRenderer<Bed> = (bed: Bed, { handleClick, modifiers }) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	return (
		<MenuItem
			disabled={bed.is_occupied}
			active={modifiers.active}
			key={bed.id}
			text={bed.name}
			onClick={handleClick}
			label={bed.ward_display_name}
		/>
	);
};

interface BProps {
	id?: string;
	name?: string;
	wardIDs?: string[];
	activeItem: Bed;
	intent: Intent;
	onItemSelect: (item: Bed, event?: SyntheticEvent<HTMLElement, Event>) => void;
}

const BedSelect = (props: BProps) => {
	const {
		ctx: { wards },
	}: any = useContext(BuildingCtx);

	const targetWards =
		((props || {}).wardIDs || []).length >= 1
			? wards.filter((w: { id: string }) => props.wardIDs?.includes(w.id))
			: wards;

	const BedList =
		((props || {}).wardIDs || []).length === 0
			? [
					{
						id: null,
						name: 'Please Select a ward First',
						is_occupied: true,
					},
			  ]
			: targetWards.reduce(
					(acc: any, { name, beds }: { name: string; beds: Bed[] }) => [
						...acc,
						...beds.map((bd) => ({
							...bd,
							ward_display_name: name,
							// ward_display_name: props.wardIDs.length > 1 && name,
						})),
					],
					[]
			  );

	return (
		<BSelect {...props} itemRenderer={renderWardItem} items={BedList} filterable={false}>
			<Button
				intent={props.intent}
				text={props.activeItem ? props.activeItem.name : 'Select'}
				rightIcon="double-caret-vertical"
			/>
		</BSelect>
	);
};

export default BedSelect;
