import { Button, Label } from '@blueprintjs/core';
import { HeaderRow, Item, Value, Location, Row, DetailBlock } from './styles';

const ViewAdmissionSkeleton = () => (
	<div className="page-content">
		<HeaderRow>
			<Location className="bp3-skeleton">ward location</Location>
			<Button minimal rightIcon="edit" intent="none" className="bp3-skeleton">
				Modify
			</Button>
		</HeaderRow>

		<Row>
			<DetailBlock>
				<Item>
					<Label>Patient Name</Label>
					<Value className="bp3-skeleton">Patient Name</Value>
				</Item>
				<Item>
					<Label>Patient Phone</Label>
					<Value className="bp3-skeleton">Patient Phone</Value>
				</Item>
			</DetailBlock>
			<DetailBlock>
				<Item>
					<Label>Guardian Name</Label>
					<Value className="bp3-skeleton">Guardian Name</Value>
				</Item>
				<Item>
					<Label>Guardian Phone</Label>
					<Value className="bp3-skeleton">Guardian Phone</Value>
				</Item>
			</DetailBlock>
		</Row>
		<Row>
			<DetailBlock>
				<Item>
					<Label>Admit Time</Label>
					<Value className="bp3-skeleton">timestamp</Value>
				</Item>
				<Item>
					<Label>Expected Discharge Time</Label>
					<Value className="bp3-skeleton">timestamp</Value>
				</Item>
			</DetailBlock>
			<DetailBlock>
				<Item>
					<Label>Doctor</Label>
					<Value noPadding className="bp3-skeleton">
						doctor name
					</Value>
				</Item>
				<Item>
					<Label>Purpose</Label>
					<Value noPadding className="bp3-skeleton">
						Purpose
					</Value>
				</Item>
				<Item>
					<Label>Comment</Label>
					<Value noPadding className="bp3-skeleton">
						Comment
					</Value>
				</Item>
			</DetailBlock>
		</Row>
		<div className="row wrap space-between">
			<Button intent="none" className="bp3-skeleton">
				Transactions
			</Button>
			<Button intent="none" className="bp3-skeleton">
				Mark as Discharged
			</Button>
		</div>
	</div>
);

export default ViewAdmissionSkeleton;
