import axios from 'axios';

const request = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 5000,
	withCredentials: true,
	validateStatus: (status) => status >= 200 && status <= 403,
});

export default request;
