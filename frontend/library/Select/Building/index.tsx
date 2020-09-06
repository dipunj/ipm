import { Select, ItemRenderer } from '@blueprintjs/select';
import { Button, MenuItem } from '@blueprintjs/core';
import { useContext, SyntheticEvent } from 'react';
import { SessionCtx } from '../../Context/SessionContext';

interface IBuilding {
	id: string;
	city: string;
	branch_code: string;
}

const BLDSelect = Select.ofType<IBuilding>();

const renderBuildingItem: ItemRenderer<IBuilding> = (
	building: IBuilding,
	{ handleClick, modifiers }
) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}
	return (
		<MenuItem
			active={modifiers.active}
			key={building.id}
			label={building.branch_code}
			onClick={handleClick}
			text={<div style={{ textTransform: 'capitalize' }}>{building.city}</div>}
		/>
	);
};

interface IBuildingSelectProps {
	disabled?: boolean;
	items?: IBuilding[];
	onItemSelect: (item: IBuilding, event?: SyntheticEvent<HTMLElement, Event> | undefined) => void;
	activeItem: IBuilding;
}

const BuildingSelect = (props: IBuildingSelectProps) => {
	const {
		ctx: { buildings },
	}: any = useContext(SessionCtx);

	const { disabled = false, items = buildings, onItemSelect, activeItem } = props;
	return (
		<BLDSelect
			disabled={disabled}
			items={items}
			itemRenderer={renderBuildingItem}
			onItemSelect={onItemSelect}
			activeItem={activeItem}
			filterable={false}
		>
			<Button
				disabled={disabled}
				text={
					<div style={{ textTransform: 'capitalize' }}>
						{`${activeItem.city} / ${activeItem.branch_code}`}
					</div>
				}
				rightIcon="double-caret-vertical"
			/>
		</BLDSelect>
	);
};

export default BuildingSelect;
