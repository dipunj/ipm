import { Table, Column } from '@blueprintjs/table';
import { TableContainer } from './styles';
import NewTransaction from './NewTransaction';
import useFetch from '../../library/hooks/fetch';
import useLayout from './Layout';

const Transactions = ({ admission_id }: { admission_id: string }): JSX.Element => {
	const { loading, data: list, refetch } = useFetch('/management/transaction/list', {
		params: { admission_id },
	});

	const { columns } = useLayout(list);

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<TableContainer>
				<Table numRows={list.length}>
					{columns.map((col) => (
						<Column key={col.name} name={col.name} cellRenderer={col.cellRender} />
					))}
				</Table>
				<NewTransaction refetch={refetch} />
			</TableContainer>
		</div>
	);
};

export default Transactions;
