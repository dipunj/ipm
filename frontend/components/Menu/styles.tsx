import styled from 'styled-components';

export const MenuContainer = styled.div`
	display: flex;
	align-items: stretch;
	margin: 36px;
	padding: 12px;
	border: 1px solid var(--border-color);
	border-radius: 20px;
	background-color: inherit;
	width: 100%;
	min-height: 64%;
`;

export const Title = styled.div`
	font-family: Helvetica, sans-serif;
	font-weight: 100;
	font-size: 20px;
`;

export const SectionWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Section = styled.div`
	display: flex;
	flex-direction: column;
	padding: 24px;
`;

export const DividerContainer = styled.div`
	position: relative;
`;

export const Divider = styled.div`
	position: absolute;
	width: 2px;
	height: 128px;
	border-radius: 1px;
	background: var(--border-color);
	top: 25%;
`;

export const ItemList = styled.ul`
	padding: 16px 0px;
`;

export const Item = styled.li`
	padding: 4px 0px;
	list-style: none;
`;
