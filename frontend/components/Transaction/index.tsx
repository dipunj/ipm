import { Table, Column } from '@blueprintjs/table';
import { Button } from '@blueprintjs/core';
import { TableContainer, TableWrapper } from './styles';
import NewTransaction from './NewTransaction';
import useFetch from '../../library/hooks/fetch';
import useLayout from './Layout';
import Providers from '../../library/Providers';
import Header from '../../library/Layout/Header';

const Transactions = ({ admission_id }: { admission_id: string }): JSX.Element => {
	const { loading, data: list, refetch } = useFetch('/management/transaction/list', {
		params: { admission_id },
	});

	const { columns } = useLayout(list);

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<TableWrapper>
			<Button icon="arrow-left" intent="warning" minimal>
				Back
			</Button>
			<TableContainer>
				<Table numRows={list.length}>
					{columns.map((col) => (
						<Column key={col.name} name={col.name} cellRenderer={col.cellRender} />
					))}
				</Table>
			</TableContainer>
			<NewTransaction refetch={refetch} />
		</TableWrapper>
	);
};

Transactions.getLayout = (page) => (
	<Providers>
		<Header />
		{page}
	</Providers>
);

export default Transactions;
