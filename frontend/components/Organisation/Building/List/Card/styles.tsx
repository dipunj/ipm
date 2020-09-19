import styled from 'styled-components';

export const Row = styled.div.attrs({
	className: 'row align-center form-margin',
})`
	padding: 12px 24px;
	margin-bottom: 8px;
	margin-top: 8px;
	border-radius: 16px;
	cursor: pointer;
	&:hover {
		background: var(--background-highlight);
	}
`;

export const HeaderRow = styled(Row)`
	margin-bottom: 16px;
	border: 1px solid var(--border-color);
	cursor: default;
	&:hover {
		background: unset;
	}
`;

const RowItem = styled.div`
	flex: 1;
`;

export const Name = styled(RowItem)`
	flex: 1;
	font-size: 24px;
`;

export const Cell = styled.div`
	flex: 1;
	min-height: 32px;
	display: flex;
	align-items: center;
	text-transform: ${({ capitalize = true }: { capitalize?: boolean }) =>
		!capitalize ? 'none' : 'capitalize'};
`;

export const HeaderCell = styled(Cell)`
	font-size: 16px;
	justify-content: ${({ textCenter = false }: { textCenter?: boolean }) =>
		textCenter && 'center'};
`;
