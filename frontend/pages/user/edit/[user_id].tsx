import { GetServerSideProps } from 'next';

export { default } from '../../../components/Organisation/User/Edit';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			user_id: params?.user_id,
		},
	};
};
