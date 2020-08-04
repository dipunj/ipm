import CloseSVG from './close-24px.svg';
import AddSVG from './add-24px.svg';

const withDiv = (SVG) => ({ containerProps, ...props }) => (
	<div {...containerProps}>
		<SVG {...props} />
	</div>
);

export const CloseIcon = withDiv(CloseSVG);
export const AddIcon = withDiv(AddSVG);
