import styled from 'styled-components';

const PageWrapper = styled.div`
	padding: 80px var(--page-padding);
	margin-top: calc(var(--header-height));
	/* min-height: 200vh; */
	min-height: calc(100vh - var(--header-height));
	display: flex;
	flex-direction: column;
`;

export { PageWrapper };
