import { prettyJSON } from '../../../../helpers';
import useFetch from '../../../../library/hooks/fetch';
import Loader from '../../../../library/Loader';
import Card, { HeaderCard } from './Card';

const ListAllUsers = () => {
	const { data, loading } = useFetch('/setup/user/list');

	if (loading) {
		return (
			<div className="page-content">
				<div className="page-title">All Users</div>
				<Loader />
			</div>
		);
	}

	const cards = data.map((user) => <Card {...user} />);
	return (
		<div className="page-content">
			<div className="page-title">All Users</div>
			<HeaderCard />
			{cards}
		</div>
	);
};

export default ListAllUsers;
