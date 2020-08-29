import styled from 'styled-components';

export const TxnDiv = styled.div`
	display: flex;
	flex-grow: 1;
	align-items: center;
`;

export const NewTxnContainer = styled.div.attrs({
	className: 'row align-stretch full-width space-evenly',
})`
	height: 72px;
	position: fixed;
	bottom: 0px;
	right: 0px;
	width: 80vw;
	padding: 16px;
	box-shadow: 0px -4px 4px 0px var(--shadow);
	background: var(--background);
`;
