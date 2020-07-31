import styled from 'styled-components';

const Title = styled.h1`
	color: red;
	font-size: 50px;
`;

export default function Home() {
	return (
		<div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
			<p class="font-bold">Be Warned</p>
			<p>Something not ideal might be happening.</p>
		</div>
	);
}
