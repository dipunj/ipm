import styled from 'styled-components';

const Wrapper = styled.div`
	/* padding: 0px var(--page-padding); */
	min-height: ${(props) => (props.height ? props.height : 'var(--header-height)')};
	box-shadow: ${(props) =>
		props.isDark
			? '0px 4px 4px 0px var(--dark-shadow)'
			: '0px 4px 4px 0px var(--light-shadow)'};
	width: 100%;
	background: inherit;

	position: fixed;
	top: 0;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding: 28px 48px;
`;

const Column = styled.div`
	display: flex;
	align-items: center;
`;

const Greeting = styled.div`
	margin-left: 40px;
`;
export { Wrapper, Container, Column, Greeting };
