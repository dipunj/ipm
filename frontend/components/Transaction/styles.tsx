import styled from 'styled-components';

export const TableContainer = styled.div`
	overflow-y: auto;
	margin-bottom: 72px;
	height: 80vh;
	border: 1px solid var(--border-color);
`;

export const TableWrapper = styled.div`
	overflow-y: auto;
	overflow-x: hidden;
	min-height: 150vh;
	padding-top: calc(var(--header-height) + 40px);
`;
