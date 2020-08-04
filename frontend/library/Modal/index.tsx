import { motion } from 'framer-motion';
import { CloseIcon } from '../../Icons';

const ScreenWrapper = ({ children }) => (
	<div className="z-0 fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
		{children}
	</div>
);

const Backdrop = ({ onClick }) => (
	<div id="backdrop" className="fixed inset-0 transition-opacity">
		<div onClick={onClick} className="z-1 absolute inset-0 bg-gray-500 opacity-50" />
	</div>
);

const Dialog = ({ children, handleClose }) => (
	<div
		className="z-2 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-4"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-headline"
	>
		<div className="flex justify-end w-full p-2">
			<CloseIcon
				onClick={handleClose}
				containerProps={{
					className: 'rounded-full hover:bg-gray-200 p-2',
					style: {
						position: 'absolute',
					},
				}}
				style={{ cursor: 'pointer', fill: 'gray' }}
			/>
		</div>
		{children}
	</div>
);

const Modal = ({
	handleClose,
	handleOutsideClick,
	blur,
	Header = 'Modal Header',
	Body,
	Footer,
}) => {
	return (
		<ScreenWrapper>
			<Backdrop onClick={handleOutsideClick} />
			<Dialog handleClose={handleClose}>
				{Header}
				{Body}
				{Footer}
			</Dialog>
		</ScreenWrapper>
	);
};

export default Modal;
