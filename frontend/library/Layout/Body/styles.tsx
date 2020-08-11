import styled from 'styled-components';

const PageWrapper = styled.div`
	padding: 0px var(--page-padding);
	padding-top: calc(var(--header-height) + 80px);
	/* min-height: 200vh; */
	min-height: calc(200vh - var(--header-height));
	display: flex;
	flex-direction: column;
	width: 100vw;
`;

export { PageWrapper };
