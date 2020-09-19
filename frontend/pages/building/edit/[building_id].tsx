import { GetServerSideProps } from 'next';

export { default } from '../../../components/Organisation/Building/Edit';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			building_id: params?.building_id,
		},
	};
};
