import styled from 'styled-components';

export const Wrapper = styled.div.attrs({
	className: 'column center full-width',
})`
	height: 100%;
`;

export const Container = styled.div.attrs({})`
	width: 90%;
	padding: 24px;
	border: 1px solid var(--border-color);
	border-radius: 16px;
`;

export const ButtonContainer = styled.div.attrs({})`
	width: 80%;
	padding: 128px 32px;
	/* border: 1px solid var(--border-color); */
`;

export const FieldName = styled.div.attrs({
	className: 'bp3-intent-danger',
})`
	text-transform: capitalize;
	color: var(--text-secondary);
	margin: 8px 0px;
`;

export const MoneyValue = styled.div`
	font-size: 20px;
	color: ${(props: { color?: string }) => props.color};
`;

export const Location = styled.div`
	font-family: Helvetica, sans-serif;
	font-weight: 100;
	color: var(--text-color);
	font-size: 32px;
`;
