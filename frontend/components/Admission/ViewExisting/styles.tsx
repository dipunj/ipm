import styled from 'styled-components';

export const Location = styled.div`
	font-family: Helvetica, sans-serif;
	font-weight: 100;
	color: var(--text-color);
	font-size: 36px;
`;

export const DetailBlock = styled.div`
	display: flex;
	flex-direction: ${(props: { direction?: string }) => props.direction || 'column'};
	align-items: flex-start;
	margin-bottom: 24px;
	margin: ${(props: { direction?: string; width?: string; margin?: string }) => props.margin};
	width: ${(props: { direction?: string; width?: string; margin?: string }) =>
		props.width || '30%'};
`;

export const HeaderRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 48px;
`;

export const Label = styled.div`
	flex: 1;
	color: var(--text-secondary);
`;
export const Value = styled.div`
	flex: 1;
	padding-left: ${(props: { noPadding?: boolean }) => (props.noPadding ? '0' : '20px')};
	font-size: 20px;
	font-family: Helvetica, sans-serif;
	font-weight: 100;
`;
