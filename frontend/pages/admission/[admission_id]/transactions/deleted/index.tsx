import { GetServerSideProps } from 'next';

export { default } from '../../../../../components/Transaction/ViewDeleted';

// export const getStaticProps: getStaticProps = async (context) => {
// 	const {
// 		params: { admission_id },
// 	} = context;

// 	const res = await request.get('/management/admission/find', {
// 		params: {
// 			admission_id,
// 		},
// 		headers: context.req ? { cookie: context.req.headers.cookie } : undefined,
// 	});
// 	return {
// 		props: { admssionAPIResponse: res },
// 	};
// };

// TODO: CHECK why are cookies not being sent to backend on ssr
// because we need to explicitly tell axios to send them in header

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			admission_id: params?.admission_id,
		},
	};
};
