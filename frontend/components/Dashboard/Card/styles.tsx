import styled from 'styled-components';

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid var(--border-color-light);
	border-radius: 16px;
	padding: 24px;
	margin-bottom: 36px;
	width: 100%;
	cursor: pointer;

	&:hover {
		box-shadow: var(--shadow-card);
	}
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: ${({ alignItems }) => alignItems};
	align-self: stretch;
`;

export const Row = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '20px')};
	flex-wrap: wrap;
`;

export const Title = styled.div`
	font-weight: 200;
	font-size: 32px;
	color: var(--text-color);
	text-transform: capitalize;
`;

export const GuardianTitle = styled.div`
	font-weight: 200;
	font-size: 16px;
	color: var(--text-color);
	text-align: right;
	text-transform: capitalize;
`;

export const Label = styled.div`
	font-weight: 200;
	font-size: 12px;
	color: var(--text-secondary);
	text-align: ${(props) => (props.right ? 'right' : 'left')};
`;

export const DateValue = styled.div`
	font-weight: 200;
	font-size: 20px;
	color: var(--text-color);
`;

export const TimeValue = styled.div`
	font-weight: 200;
	font-size: 18px;
	color: var(--text-secondary);
`;

export const Phone = styled.div`
	font-weight: 200;
	font-size: 16px;
	color: var(--text-color);
`;

export const GuardianPhone = styled.div`
	font-weight: 200;
	font-size: 12px;
	color: var(--text-color);
	text-align: right;
`;

export const WardName = styled.div`
	font-family: Helvetica, sans-serif;
	font-size: 32px;
	font-weight: 100;
	text-align: right;
	color: var(--text-secondary);
`;
