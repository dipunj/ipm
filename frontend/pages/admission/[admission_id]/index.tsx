import { GetServerSideProps } from 'next';

export { default } from '../../../components/Admission/ViewExisting';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		params: { admission_id },
	} = context;

	return {
		props: {
			admission_id,
		},
	};
};

// TODO: CHECK why are cookies not being sent to backend on ssr
// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const {
// 		params: { admission_id },
// 	} = context;

// 	const res = await request.get('/management/admission/find', {
// 		admission_id,
// 	});

// 	console.log('hello', res);

// 	// if (res.data.success && res.data.is_authenticated) {
// 	return {
// 		props: { admission: res.data },
// 	};
// 	// }
// 	return {
// 		props: { admission: null },
// 	};
// };
