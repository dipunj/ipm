import { ISpinnerProps, IProgressBarProps, Spinner } from '@blueprintjs/core';
import CircularLoader from './Spinner';
import LinearLoader from './Linear';

interface ILoaderProps {
	type?: 'linear' | 'circular';
	loaderProps?: ISpinnerProps | IProgressBarProps;
}

const Loader = (props: ILoaderProps): JSX.Element => {
	const {
		type = 'circular',
		loaderProps = {
			intent: 'primary',
			size: Spinner.SIZE_LARGE,
		},
	} = props;

	return type === 'circular' ? (
		<CircularLoader {...loaderProps} />
	) : (
		<LinearLoader {...loaderProps} />
	);
};

export default Loader;
