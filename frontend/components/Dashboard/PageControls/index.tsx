import { InputGroup, Button } from '@blueprintjs/core';
import { RowContainer, InputContainer } from './styles';

const PageControls = ({
	searchQuery,
	handleSearchQueryChange,
	doSearch,
}: {
	searchQuery: string;
	handleSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	doSearch: any;
}): JSX.Element => {
	return (
		<RowContainer>
			<InputContainer>
				<InputGroup
					intent="primary"
					large
					type="search"
					value={searchQuery}
					leftIcon="search"
					onChange={handleSearchQueryChange}
					placeholder="Patient Name / Phone Number"
				/>
			</InputContainer>
			<Button intent="primary" onClick={doSearch} large>
				Search
			</Button>
		</RowContainer>
	);
};

export default PageControls;
