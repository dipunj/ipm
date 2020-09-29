import { Button } from '@blueprintjs/core';
import React from 'react';
import { Gender } from '../../../../common/types';
import { dateFormatOptions } from '../../../../helpers';
import { Location, Label, HeaderRow, DetailBlock, Value, Row, Item } from '../styles';

interface IAdmissionCardData {
	data: {
		bed: {
			name: string;
			ward: { name: string; floor: number };
		};
		guardian_name: string;
		guardian_phone: string;
		doctor_name: string;
		is_discharged: boolean;
		admit_timestamp: Date;
		discharge_timestamp: Date;
		patient: { name: string; yob: number; gender: Gender; phone: string };
		purpose: string;
		comment: string;
	};
	logMode?: boolean;
	handleModify?: () => void;
}

const AdmissionDetailCard = (props: IAdmissionCardData): JSX.Element => {
	const {
		data: {
			bed: {
				name: bedName,
				ward: { name: wardName, floor },
			},
			guardian_name,
			guardian_phone,
			doctor_name,
			is_discharged,
			admit_timestamp,
			discharge_timestamp,
			// updated_by: { name: updated_by, id: updated_by_id },
			patient: {
				name: patientName,
				yob: patientYob,
				gender: patientGender,
				phone: patientPhone,
			},
			purpose,
			comment,
		},
		logMode = false,
		handleModify = undefined,
	} = props;

	const location = `${floor === 0 ? 'G' : `L${floor}`} / ${wardName} / ${bedName}`;

	const patientAge = new Date().getFullYear() - patientYob;
	const parsedAdmitTime = new Date(admit_timestamp).toLocaleString('en-GB', dateFormatOptions);
	const parsedDischargeTime = discharge_timestamp
		? new Date(discharge_timestamp).toLocaleString('en-GB', dateFormatOptions)
		: '-';

	return (
		<>
			<HeaderRow>
				<Location>{location}</Location>
				{!is_discharged && handleModify && (
					<Button onClick={handleModify} minimal rightIcon="edit">
						Modify
					</Button>
				)}
			</HeaderRow>
			<Row>
				<DetailBlock>
					<Item>
						<Label>Patient Name</Label>
						<Value>
							{patientName} ({patientAge && `${patientAge}yr`} {patientGender})
						</Value>
					</Item>
					<Item>
						<Label>Patient Phone</Label>
						<Value>{patientPhone}</Value>
					</Item>
				</DetailBlock>
				<DetailBlock>
					<Item>
						<Label>Guardian Name</Label>
						<Value>{guardian_name || '-'}</Value>
					</Item>
					<Item>
						<Label>Guardian Phone</Label>
						<Value>{guardian_phone || '-'}</Value>
					</Item>
				</DetailBlock>
			</Row>
			<Row>
				<DetailBlock>
					<Item>
						<Label>Admit Time</Label>
						<Value>{parsedAdmitTime || '-'}</Value>
					</Item>
					<Item>
						<Label>
							{!is_discharged && 'Expected'} Discharge Time {!is_discharged && '*'}
						</Label>
						<Value>{parsedDischargeTime || '-'}</Value>
					</Item>
					{logMode && (
						<Item>
							<Label>Discharge Status</Label>
							<Value>{!is_discharged && 'Not'} Discharged</Value>
						</Item>
					)}
				</DetailBlock>
				<DetailBlock>
					<Item>
						<Label>Doctor</Label>
						<Value noPadding>{doctor_name || '-'}</Value>
					</Item>
					<Item>
						<Label>Purpose</Label>
						<Value noPadding>{purpose || '-'}</Value>
					</Item>
					<Item>
						<Label>Comment</Label>
						<Value noPadding>{comment || '-'}</Value>
					</Item>
				</DetailBlock>
			</Row>
		</>
	);
};

export default AdmissionDetailCard;
