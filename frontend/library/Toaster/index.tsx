import { Position, Toaster } from '@blueprintjs/core';
import { AxiosResponse } from 'axios';

/** Singleton toaster instance. Create separate instances for different options. */
const AppToast =
	typeof window !== 'undefined'
		? Toaster.create({
				position: Position.TOP,
		  })
		: null;

export const handleErrorToast = (error: { response: AxiosResponse }, props = {}) =>
	AppToast?.show({ intent: 'danger', message: error.response.data.response.message, ...props });

export const handleSuccessToast = (response: AxiosResponse, props = {}) =>
	AppToast?.show({ intent: 'success', message: response.data.response.message, ...props });

export default AppToast;
