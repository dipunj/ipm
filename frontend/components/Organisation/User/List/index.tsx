import { useRouter } from 'next/router';
import { prettyJSON } from '../../../../helpers';
import useFetch from '../../../../library/hooks/fetch';
import Loader from '../../../../library/Loader';
import request from '../../../../library/Request';
import { handleErrorToast, handleSuccessToast } from '../../../../library/Toaster';
import Card, { HeaderCard } from './Card';

const ListAllUsers = () => {
	const router = useRouter();
	const { data, loading, refetch } = useFetch('/setup/user/list');

	if (loading) {
		return (
			<div className="page-content">
				<div className="page-title">All Users</div>
				<Loader />
			</div>
		);
	}

	// TODO: Allow user to select if he wants to hard delete (delete from db)/soft delete (toggle state) a user
	const handleDelete = async (user_id: string) => {
		try {
			const response = await request.post('/setup/user/toggle_state', {
				id: user_id,
			});
			handleSuccessToast(response);
			refetch();
		} catch (error) {
			handleErrorToast(error);
		}
	};

	const handleEdit = (user_id: string) => {
		router.push('/user/edit/[user_id]', `/user/edit/${user_id}`);
	};
	const cards = data.map((user) => (
		<Card key={user.id} {...{ userData: user, handleDelete, handleEdit }} />
	));
	return (
		<div className="page-content">
			<div className="page-title">All Users</div>
			<HeaderCard />
			{cards}
		</div>
	);
};

export default ListAllUsers;
