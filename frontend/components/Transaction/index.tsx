import { Table, Column } from '@blueprintjs/table';
import { Button } from '@blueprintjs/core';
import { TableContainer, TableWrapper, TableLayout } from './styles';
import NewTransaction from './NewTransaction';
import useFetch from '../../library/hooks/fetch';
import useLayout from './Layout';
import Providers from '../../library/Providers';
import Header from '../../library/Layout/Header';
import TotalOverview from './TotalOverview';

const Transactions = ({ admission_id }: { admission_id: string }): JSX.Element => {
	const { loading, data, refetch } = useFetch('/management/transaction/list', {
		params: { admission_id },
	});

	const { columns } = useLayout(data?.list, refetch);

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<TableWrapper>
			<TableLayout>
				<TableContainer>
					<Table numRows={data.list.length}>
						{columns.map((col) => (
							<Column key={col.name} name={col.name} cellRenderer={col.cellRender} />
						))}
					</Table>
				</TableContainer>
				<TotalOverview totals={data.totals} admission_info={data.admission_info} />
			</TableLayout>
			<NewTransaction refetch={refetch} />
		</TableWrapper>
	);
};

Transactions.getLayout = (page) => (
	<Providers>
		{/* <Header /> */}
		{page}
	</Providers>
);

export default Transactions;
