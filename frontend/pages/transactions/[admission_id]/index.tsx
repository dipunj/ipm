import { GetServerSideProps } from 'next';
// import request from '../../../library/Request';

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const {
// 		params: { admission_id },
// 	} = context;

// 	return {
// 		props: {
// 			admission_id,
// 		},
// 	};
// };

// TODO: CHECK why are cookies not being sent to backend on ssr
// because we need to explicitly tell axios to send them in header
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params } = context;

	// const res = await request.get('/management/transaction/list', {
	// 	params: {
	// 		admission_id: params?.admission_id,
	// 	},
	// 	headers: context.req ? { cookie: context.req.headers.cookie } : undefined,
	// });
	return {
		props: {
			// transactionsAPIResponse: res.data,
			admission_id: params?.admission_id,
		},
	};
};

export { default } from '../../../components/Transaction';
