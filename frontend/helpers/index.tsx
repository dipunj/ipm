export const prettyJSON = (data) => <pre>{JSON.stringify(data, null, '\t')}</pre>;

export const getFromLS = (key) => {
	const state = JSON.parse(localStorage.getItem('data'));
	if (state) {
		if (state.hasOwnProperty(key)) return state[key];
	} else {
		return null;
	}
};

export const saveToLS = (key, value) => {
	let state = JSON.parse(localStorage.getItem('data'));
	if (state) {
		state = {
			...state,
			[key]: value,
		};
	} else {
		state = {
			[key]: value,
		};
	}
	localStorage.setItem('data', JSON.stringify(state));
};

export const getCookie = (key) => {
	const jsCookies = document.cookie;
	if (jsCookies) {
		const parsedCookies = jsCookies.split('; ').reduce((acc, kv) => {
			const [k, v] = kv.split(/=(.+)/);
			return {
				...acc,
				[k]: v,
			};
		}, {});
		return parsedCookies[key];
	}
	return null;
};

export const setCookie = (key, value) => {
	// const jsCookies = document.cookie;
	// const parsedCookies = jsCookies.split('; ').reduce((acc, kv) => {
	// 	const [k, v] = kv.split(/=(.+)/);
	// 	return {
	// 		...acc,
	// 		[k]: v,
	// 	};
	// }, {});
	// parsedCookies[key] = value;
	document.cookie = `${key}=${value}`;
};
