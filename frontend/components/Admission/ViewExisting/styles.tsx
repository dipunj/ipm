import styled from 'styled-components';

export const Location = styled.div`
	font-family: Helvetica, sans-serif;
	font-weight: 100;
	color: var(--text-color);
	font-size: 36px;
`;

export const DetailBlock = styled.div`
	min-width: 50%;
`;

export const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 36px;
	align-items: center;
`;

export const Item = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	margin: 12px 0px;
`;

export const HeaderRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 48px;
`;

export const Label = styled.div`
	/* flex: 1; */
	color: var(--text-secondary);
`;
export const Value = styled.div`
	/* flex: 1; */
	/* padding-left: ${(props: { noPadding?: boolean }) => (props.noPadding ? '0' : '20px')}; */
	font-size: 20px;
	font-family: Helvetica, sans-serif;
	font-weight: 100;
`;
