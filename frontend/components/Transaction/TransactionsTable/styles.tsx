import styled from 'styled-components';

export const TableContainer = styled.div`
	max-width: 80vw;
	overflow-y: auto;
	margin-bottom: 72px;

	@media screen and (max-width: 500px) {
		max-width: 100vw;
		width: 100vw;
	}
`;
