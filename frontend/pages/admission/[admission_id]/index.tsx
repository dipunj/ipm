import { GetServerSideProps } from 'next';
import request from '../../../library/Request';

export { default } from '../../../components/Admission/ViewExisting';

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
export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		params: { admission_id },
	} = context;

	const res = await request.get('/management/admission/find', {
		params: {
			admission_id,
		},
		headers: context.req ? { cookie: context.req.headers.cookie } : undefined,
	});
	console.log(res.data.response);
	return {
		props: { admissionAPIResponse: res.data },
	};
};
