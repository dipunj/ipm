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
