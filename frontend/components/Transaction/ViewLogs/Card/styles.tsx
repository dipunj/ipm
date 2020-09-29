import styled from 'styled-components';

export const Row = styled.div`
	display: flex;
	align-items: align-center;
	width: 100%;
	padding: 4px 24px;
	border-radius: 16px;

	&.clickable {
		cursor: pointer;
		&:hover {
			background: var(--background-highlight);
		}
	}
`;

export const HeaderRow = styled(Row)`
	margin-bottom: 16px;
	padding: 12px 24px;
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
