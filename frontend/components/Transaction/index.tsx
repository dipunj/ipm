import { prettyJSON } from '../../helpers';

interface ITransaction {
	id: string;
	is_credit: boolean;
	payment_mode: string;
	currency: string;
	value: string;
	is_settled: boolean;
	purpose: string;
	reverses_transaction_id: string;
	admission_id: string;
	updated_by_id: string;
}

const Transactions = ({ transactionsAPIResponse }) => {
	return <div>{prettyJSON(transactionsAPIResponse)}</div>;
};

export default Transactions;
