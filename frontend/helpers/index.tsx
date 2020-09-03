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

export const shortDateOptions = {
	day: 'numeric',
	month: 'short',
};

export const dateOptions = {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
};

export const getCurrencySymbol = (locale: string, currency: string): string =>
	(0)
		.toLocaleString(locale, {
			style: 'currency',
			currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		})
		.replace(/\d/g, '')
		.trim();

export const systemCurrency = new Intl.NumberFormat('en-IN', {
	style: 'currency',
	currency: 'INR',
	minimumFractionDigits: 2,
});

export const withCurrency = (value: string) => systemCurrency.format(parseFloat(value));

interface IPasswordValidation {
	message: string;
	exp: RegExp;
	satisfy?: boolean;
}
export const validatePassword = (
	pass: string,
	conditions?: IPasswordValidation[]
): IPasswordValidation[] => {
	// the regex matches
	/*
	 * At least one upper case English letter, (?=.*?[A-Z])
	 * At least one lower case English letter, (?=.*?[a-z])
	 * At least one digit, (?=.*?[0-9])
	 * At least one special character, (?=.*?[#?!@$%^&*-])
	 * Minimum eight in length .{8,} (with the anchors)
	 */

	const conditionArray: IPasswordValidation[] = conditions || [
		{
			// upper case letter
			message: 'At least one upper case English letter',
			exp: /[A-Z]/,
		},
		{
			// lower case letter
			message: 'At least one lower case letter',
			exp: /[a-z]/,
		},
		{
			// number letter
			message: 'At least one digit',
			exp: /[0-9]/,
		},
		{
			// special character
			message: 'At least one special character',
			exp: /[#?!@$%^&*-]/,
		},
		{
			// minimum length = 8 characters
			message: 'Minimum 8 characters',
			exp: /^.{8,}$/,
		},
	];

	return conditionArray.reduce(
		(acc, cnd) => [...acc, { ...cnd, satisfy: cnd.exp.test(pass) }],
		[]
	);
};
