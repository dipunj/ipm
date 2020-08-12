import { InputGroup, Button } from '@blueprintjs/core';
import { RowContainer, InputContainer } from './styles';

const PageControls = ({
	searchQuery,
	handleSearchQueryChange,
	doSearch,
	toggleDrawer,
}): JSX.Element => {
	return (
		<>
			<div>
				<Button intent="warning" minimal onClick={toggleDrawer}>
					View Wards
				</Button>
			</div>
			<RowContainer>
				<InputContainer>
					<InputGroup
						intent="primary"
						large
						type="search"
						value={searchQuery}
						leftIcon="search"
						// fill
						// onChange={handleSearchQueryChange}
						placeholder="Patient Name / Phone Number"
					/>
				</InputContainer>
				<Button intent="primary" onClick={doSearch} large>
					Search
				</Button>
			</RowContainer>
		</>
	);
};

export default PageControls;
