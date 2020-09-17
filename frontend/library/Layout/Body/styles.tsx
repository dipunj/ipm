import styled from 'styled-components';

const PageWrapper = styled.div`
	padding: 0px var(--page-padding);
	padding-top: var(--header-height);
	/* min-height: 200vh; */
	min-height: calc(100vh - var(--header-height));
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
`;

export { PageWrapper };
