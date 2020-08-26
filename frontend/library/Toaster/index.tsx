import { Position, Toaster, Intent } from '@blueprintjs/core';

/** Singleton toaster instance. Create separate instances for different options. */
const AppToast =
	typeof window !== 'undefined'
		? Toaster.create({
				position: Position.TOP,
		  })
		: null;

export const handleErrorToast = (error, props = {}) =>
	AppToast.show({ intent: 'danger', message: error.response.data.response.message, ...props });

export const handleSuccessToast = (response, props = {}) =>
	AppToast.show({ intent: 'success', message: response.data.response.message, ...props });

export default AppToast;
