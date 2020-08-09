import styled from 'styled-components';

const Container = styled.div`
	/* padding: 0px var(--page-padding); */
	height: ${(props) => (props.height ? props.height : 'var(--header-height)')};
	/* background: inherit; */
`;

export { Container };
