import styled from 'styled-components';

export const RowContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 12px 0px 64px;
`;

export const InputContainer = styled.div`
	/* will align exactly at the middle of the RowContainer, since flex property causes it to align in the center */
	/* but position absolute forces it out of the flow */
	/* width: 30%;
	position: absolute; */
	min-width: 30%;
	margin-right: 36px;
`;
