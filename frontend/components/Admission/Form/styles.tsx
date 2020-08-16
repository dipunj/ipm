import styled from 'styled-components';

export const DetailBlock = styled.div`
	border: 1px solid var(--border-color-light);
	position: relative;
	border-radius: 24px;
	padding: 32px;
	margin-bottom: 48px;
`;

export const BlockLabel = styled.div`
	position: absolute;
	color: var(--text-secondary);
	top: -8px;
	left: 24px;
	line-height: 16px;
	margin: 0px;
	background: var(--background);
	padding: 0 8px;
`;
