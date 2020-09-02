import styled from 'styled-components';

export const ButtonContainer = styled.div.attrs({
	className: 'row full-width full-height',
})`
	max-width: 300px;
	margin: 32px;
`;

export const InputContainer = styled.div.attrs({
	className: 'column full-width full-height',
})`
	justify-content: space-between;
	max-width: 560px;
	min-height: 276px;
	padding: 64px;
	border-radius: 36px;
	background: #0000000c;
`;
