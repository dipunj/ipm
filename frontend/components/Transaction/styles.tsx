import styled from 'styled-components';

export const TableContainer = styled.div`
	overflow-y: auto;
	/* margin-bottom: 72px; */
	height: 99%;
	border: 1px solid var(--border-color);
	width: 72vw;
`;

export const TableWrapper = styled.div`
	overflow-y: auto;
	overflow-x: hidden;
	/* min-height: 150vh; */
	/* padding-top: calc(var(--header-height) + 40px); */
`;

export const TableLayout = styled.div.attrs({
	className: 'row',
})`
	height: calc(100vh - var(--header-height));
`;
