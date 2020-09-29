import { Select, ItemRenderer, MultiSelect } from '@blueprintjs/select';
import { Button, MenuItem } from '@blueprintjs/core';
import { useContext, SyntheticEvent } from 'react';
import { SessionCtx } from '../../Context/SessionContext';

export interface IBuilding {
	id: string;
	city: string;
	branch_code: string;
}

const BLDSelect = Select.ofType<IBuilding>();
const MultiBLDSelect = MultiSelect.ofType<IBuilding>();

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

const multiSelectTagRenderer = (building: IBuilding): string => {
	return `${building.city}-${building.branch_code}`;
};

interface IBuildingSelectProps {
	multiSelect?: boolean;
	disabled?: boolean;
	items?: IBuilding[];
	onItemSelect: (item: IBuilding, event?: SyntheticEvent<HTMLElement, Event> | undefined) => void;
	activeItem: IBuilding;
}

interface IBuildingMultiSelectProps {
	multiSelect?: boolean;
	items?: IBuilding[];
	onItemSelect: (item: IBuilding, event?: SyntheticEvent<HTMLElement, Event> | undefined) => void;
	multiSelectTagRemove: (_tag: string, index: number) => void;
	activeItemList: IBuilding[];
	clearButton?: JSX.Element;
	fill: boolean;
}

const BuildingSelect = (props: IBuildingSelectProps | IBuildingMultiSelectProps) => {
	const {
		ctx: { buildings },
	}: any = useContext(SessionCtx);

	const { items = buildings, multiSelect = false } = props;

	if (!multiSelect) {
		const { disabled = false, onItemSelect, activeItem }: any = props;
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
	}

	const { onItemSelect, fill, activeItemList, multiSelectTagRemove, clearButton }: any = props;

	return (
		<MultiBLDSelect
			items={items}
			fill={fill}
			itemRenderer={renderBuildingItem}
			onItemSelect={onItemSelect}
			itemsEqual="id"
			tagRenderer={multiSelectTagRenderer}
			selectedItems={activeItemList}
			tagInputProps={{
				onRemove: multiSelectTagRemove,
				rightElement: clearButton,
			}}
		/>
	);
};

export default BuildingSelect;
