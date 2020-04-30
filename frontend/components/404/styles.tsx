import { H1 } from '@blueprintjs/core';
import styled from 'styled-components';

export const NotFound = styled.img`
	width: 100%;
	height: auto;
`;

export const Wrapper = styled.div.attrs({
	className: 'row justify-center full-width',
})`
	max-width: 360px;
	/* background: blue; */
`;

export const HeaderText = styled(H1)`
	font-family: Helvetica, sans-serif;
	font-weight: 100;
`;
