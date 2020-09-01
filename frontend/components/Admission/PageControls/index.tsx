import { InputGroup, Button, Popover, Position } from '@blueprintjs/core';
import { DateRangePicker, DateRange } from '@blueprintjs/datetime';
import { RowContainer, InputContainer, ControlsContainer } from './styles';
import { shortDateOptions, dateOptions } from '../../../helpers';

interface IPageControls {
	searchQuery: string;
	handleSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleDateChange: (range: DateRange) => void;
	doSearch: any;
	fromDate: Date;
	toDate: Date;
}

const PageControls = (props: IPageControls): JSX.Element => {
	const {
		searchQuery,
		handleDateChange,
		handleSearchQueryChange,
		doSearch,
		fromDate = null,
		toDate = null,
	} = props;

	const showDateControls = handleDateChange !== undefined;

	const dateLabel =
		fromDate && toDate
			? `${fromDate.toLocaleString('en-GB', shortDateOptions)}-${toDate.toLocaleDateString(
					'en-GB',
					shortDateOptions
			  )}`
			: 'Date Interval';

	return (
		<RowContainer>
			<InputContainer>
				<InputGroup
					intent="primary"
					large
					fill
					name="search"
					type="search"
					value={searchQuery}
					leftIcon="search"
					onChange={handleSearchQueryChange}
					placeholder="Patient Name / Phone Number"
				/>
			</InputContainer>
			<ControlsContainer>
				{showDateControls && (
					<Popover position={Position.BOTTOM_RIGHT}>
						<Button minimal intent="warning" style={{ marginRight: '36px' }}>
							{dateLabel}
						</Button>
						<DateRangePicker value={[fromDate, toDate]} onChange={handleDateChange} />
					</Popover>
				)}
				<Button intent="primary" onClick={doSearch} large>
					Search
				</Button>
			</ControlsContainer>
		</RowContainer>
	);
};

export default PageControls;
