import styled from 'styled-components';

export const Background = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: row;
	background: #1c1c1c;
`;

export const Column = styled.div`
	display: flex;
	width: 50%;
	flex-direction: column;
	justify-content: center;
`;

export const CenterColumn = styled(Column)`
	align-items: center;
`;

export const Logo = styled.img`
	width: 300px;
	height: auto;
`;

export const Brand = styled.h1`
	font-family: Helvetica, sans-serif;
	font-weight: 100;
	font-size: 58px;
	color: white;
	text-shadow: 0 0px 64px black;
`;

export const AppName = styled.h2`
	font-family: 'Exo 2';
	font-size: 36px;
	font-weight: lighter;
	color: white;
`;
