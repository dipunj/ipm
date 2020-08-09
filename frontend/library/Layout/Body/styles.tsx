import styled from 'styled-components';

const PageWrapper = styled.div`
	padding: 80px var(--page-padding);
	margin-top: calc(var(--header-height) + 86px - 64px);
	/* min-height: 200vh; */
	min-height: calc(100vh - var(--header-height));
`;

export { PageWrapper };
