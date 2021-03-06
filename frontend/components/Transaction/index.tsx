import { Table, Column } from '@blueprintjs/table';
import { useState } from 'react';
import { TableContainer, TableWrapper, TableLayout } from './styles';
import NewTransaction from './NewTransaction';
import useFetch from '../../library/hooks/fetch';
import useLayout from './Layout';
import Providers from '../../library/Providers';
import Header from '../../library/Layout/Header';
import TotalOverview from './TotalOverview';
import Loader from '../../library/Loader';

const Transactions = ({ admission_id }: { admission_id: string }): JSX.Element => {
	const { loading, data, refetch } = useFetch('/management/transaction/list', {
		params: { admission_id },
	});

	const [columnWidths, setColumnWidths] = useState([80, 100, 120, 100, 180, 145, 120, 140]);
	const handleColumnWidthChange = (index: number, size: number) => {
		setColumnWidths((prev) => {
			const replica = [...prev];
			replica[index] = size;
			return replica;
		});
	};
	const { columns } = useLayout(data?.list, refetch);

	if (loading) {
		return (
			<TableWrapper>
				<TableLayout>
					<div className="row full-height full-width center">
						<Loader />
					</div>
				</TableLayout>
			</TableWrapper>
		);
	}

	return (
		<TableWrapper>
			<TableLayout>
				<TableContainer>
					<Table
						numRows={data.list.length}
						columnWidths={columnWidths}
						onColumnWidthChanged={handleColumnWidthChange}
					>
						{columns.map((col: any) => (
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

Transactions.getLayout = (page: any) => (
	<Providers>
		<Header buildingToggle={false} />
		{page}
	</Providers>
);

export default Transactions;
