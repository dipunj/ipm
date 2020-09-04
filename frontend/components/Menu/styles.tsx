import styled from 'styled-components';

export const MenuContainer = styled.div`
	display: flex;
	align-items: stretch;
	justify-content: flex-start;
	margin: 36px;
	padding: 12px;
	border: 1px solid var(--border-color);
	border-radius: 20px;
	background-color: inherit;
`;

export const Title = styled.div`
	font-family: Helvetica, sans-serif;
	font-weight: 100;
	font-size: 20px;
`;

export const Section = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 24px;
`;

export const Divider = styled.div`
	background: var(--border-color);
	height: 50%;
	width: 2px;
	border-radius: 1px;
	margin: 5% 40px;
`;

export const ItemList = styled.ul`
	padding: 16px 0px;
`;

export const Item = styled.li`
	padding: 4px 0px;
	list-style: none;
`;
