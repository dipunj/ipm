export const prettyJSON = (data: any) => <pre>{JSON.stringify(data, null, '\t')}</pre>;

export const getFromLS = (key: string) => {
	const data = localStorage.getItem('data');
	if (data) {
		const state = JSON.parse(data);
		if (state.hasOwnProperty(key)) return state[key];
	} else {
		return null;
	}
};

export const saveToLS = (key: string, value: string): void => {
	const data = localStorage.getItem('data');
	let state;
	if (data) {
		state = JSON.parse(data);
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

export const getCookie = (key: string): string | null => {
	const jsCookies = document.cookie;
	if (jsCookies) {
		const parsedCookies: any = jsCookies.split('; ').reduce((acc, kv) => {
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

export const setCookie = (key: string, value: string, path = '/'): void => {
	// const jsCookies = document.cookie;
	// const parsedCookies = jsCookies.split('; ').reduce((acc, kv) => {
	// 	const [k, v] = kv.split(/=(.+)/);
	// 	return {
	// 		...acc,
	// 		[k]: v,
	// 	};
	// }, {});
	// parsedCookies[key] = value;
	document.cookie = `${key}=${value};path=${path}`;
};

export const dateFormatOptions = {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	hour12: true,
	hour: 'numeric',
	minute: 'numeric',
};

export const getCurrencySymbol = (locale, currency) =>
	(0)
		.toLocaleString(locale, {
			style: 'currency',
			currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		})
		.replace(/\d/g, '')
		.trim();
