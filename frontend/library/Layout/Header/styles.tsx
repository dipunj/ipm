import styled from 'styled-components';

const Wrapper = styled.div`
	/* padding: 0px var(--page-padding); */
	min-height: ${(props) => (props.height ? props.height : 'var(--header-height)')};
	box-shadow: 0px 4px 4px 0px var(--shadow);

	/* not 100%, otherwise scrollbar would leave a gap on the right side */
	width: 100vw;
	background: var(--background);

	position: fixed;
	top: 0;
	z-index: 30;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding: 12px 48px 12px 28px;
`;

const MenuContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 36px;
	padding: 12px;
	border: 1px solid var(--text-secondary);
	border-radius: 20px;
	background-color: inherit;
`;

const Column = styled.div`
	display: flex;
	align-items: center;
`;

const Greeting = styled.div`
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Chrome/Safari/Opera */
	-khtml-user-select: none; /* Konqueror */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently not supported by any browser */
	cursor: pointer;
	padding: 10px;
	:hover {
		background: var(--shadow);
		/* border: 0.5px solid var(--text-secondary); */
		border-radius: 8px;
	}
`;

const IconContainer = styled.div`
	cursor: pointer;
	padding: 16px;
	border-radius: 50%;
	margin-right: 20px;

	&:hover {
		background-color: var(--shadow);
	}
`;
export { Wrapper, Container, Column, Greeting, IconContainer, MenuContainer };
