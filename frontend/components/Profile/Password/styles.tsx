import styled from 'styled-components';
import { Colors } from '@blueprintjs/core';

export const ButtonContainer = styled.div.attrs({
	className: 'row full-width full-height',
})`
	max-width: 300px;
	margin-top: 32px;
`;

export const InputContainer = styled.div.attrs({
	className: 'column center full-width full-height',
})`
	justify-content: space-between;
	max-width: 560px;
	/* min-height: 400px; */
	padding: 64px;
	border-radius: 36px;
	background: var(--background-highlight);
`;

export const ListItem = styled.li`
	color: ${(props: { satisfy?: boolean }) => (props.satisfy ? Colors.GREEN5 : Colors.RED5)};
	margin: 0px !important;
`;

export const ChecksContainer = styled.div`
	border-radius: 36px;
	background: var(--background-highlight);
	padding: 48px;
`;
