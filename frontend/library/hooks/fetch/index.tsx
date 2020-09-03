import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import request from '../../Request';
import { handleErrorToast } from '../../Toaster';

interface IApiResponse {
	loading: boolean | null;
	success: boolean | null;
	message: string | null;
	data?: any;
	refetch: () => void;
}

const useFetch = (
	url: string,
	options?: AxiosRequestConfig | undefined,
	handleError = handleErrorToast
): IApiResponse => {
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState({
		success: null,
		message: null,
		data: null,
	});

	const fetchData = async () => {
		try {
			const res = await request.get(url, options);
			await setResponse({
				success: res.data.success,
				message: res.data.response.message,
				data: res.data.response.data,
			});
			setLoading(false);
		} catch (error) {
			await handleError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		loading,
		success: response.success,
		message: response.message,
		data: response.data,
		refetch: fetchData,
	};
};

export default useFetch;
