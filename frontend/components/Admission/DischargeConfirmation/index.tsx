import { Alert, H4, FormGroup, Popover, Button, Intent } from '@blueprintjs/core';
import { DatePicker } from '@blueprintjs/datetime';
import { useState } from 'react';
import { AlertContainer } from '../ViewExisting/styles';
import { dateFormatOptions } from '../../../helpers';
import { handleSuccessToast, handleErrorToast } from '../../../library/Toaster';
import request from '../../../library/Request';

interface IDischargeProps {
	showAlert: boolean;
	toggleAlert: () => void;
	reopenAdmission: boolean;
	admission_id: string;
	ctaIntent?: Intent;
	successCallback?: () => void;
}

const DischargeConfirmation = (props: IDischargeProps) => {
	const [actualDischargeTimeStamp, setActualDischargeTimeStamp] = useState(new Date());
	const {
		showAlert,
		toggleAlert,
		reopenAdmission,
		admission_id,
		ctaIntent,
		successCallback = () => {},
	} = props;

	const handleDateChange = (selectedDate: Date) => {
		setActualDischargeTimeStamp(selectedDate);
	};

	const makeDischargeCall = async () => {
		try {
			const params = {
				admission_id,
				discharge_timestamp: actualDischargeTimeStamp,
				undo_discharge: reopenAdmission,
			};

			const response = await request.post('/management/admission/discharge', { ...params });
			if (response.data.success && response.data.is_authenticated) {
				toggleAlert();
				successCallback();
				handleSuccessToast(response);
			}
		} catch (error) {
			handleErrorToast(error);
		}
	};

	return (
		<Alert
			isOpen={showAlert}
			onCancel={toggleAlert}
			onConfirm={makeDischargeCall}
			cancelButtonText="Cancel"
			confirmButtonText="Confirm Discharge"
			intent={ctaIntent || 'danger'}
			icon="confirm"
			style={{ minWidth: '36vw' }}
		>
			<H4>Are you sure? This action cannot be reversed!</H4>
			<AlertContainer>
				<FormGroup
					className="row align-center space-evenly full-width"
					label="Discharge DateTime:"
					labelFor="discharge-timestamp"
				>
					<Popover>
						<Button intent="none">
							{actualDischargeTimeStamp.toLocaleString('en-GB', dateFormatOptions)}
						</Button>
						<DatePicker
							canClearSelection={false}
							highlightCurrentDay
							value={actualDischargeTimeStamp}
							timePickerProps={{
								useAmPm: true,
								onChange: (time) => handleDateChange(time),
							}}
							onChange={(val, _) => handleDateChange(val)}
						/>
					</Popover>
				</FormGroup>
			</AlertContainer>
		</Alert>
	);
};

export default DischargeConfirmation;
