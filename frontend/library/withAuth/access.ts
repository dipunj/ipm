export const OperatorMenu = {
	Admission: [
		{
			position: 1,
			icon: 'plus',
			name: 'New Admission',
			url: '/admission/new',
		},
		{
			position: 2,
			icon: 'filter-list',
			name: 'Active Admissions',
			url: '/admission/active',
		},
		{
			position: 3,
			icon: 'history',
			name: 'Past Admissions',
			url: '/admission/past',
		},
	],
	'Building Explorer': [
		{
			position: 1,
			icon: 'locate',
			name: 'View Current Building',
			url: '/building/view',
		},
	],
};

export const AdminMenu = {
	Admissions: [
		{
			position: 1,
			icon: 'plus',
			name: 'New Admission',
			url: '/admission/new',
		},
		{
			position: 2,
			icon: 'filter-list',
			name: 'Active Admissions',
			url: '/admission/active',
		},
		{
			position: 3,
			icon: 'history',
			name: 'Past Admissions',
			url: '/admission/past',
		},
	],
	Users: [
		{
			position: 1,
			icon: 'people',
			name: 'All Users',
			url: '/user/list',
		},
		{
			position: 2,
			icon: 'new-person',
			name: 'Create New User',
			url: '/user/new',
		},
		{
			position: 3,
			icon: 'history',
			name: 'Login History',
			url: '/user/login-history',
		},
	],
	Buildings: [
		{
			position: 1,
			icon: 'office',
			name: 'New Building',
			url: '/building/new',
		},
		{
			position: 2,
			icon: 'search-around',
			name: 'Wards / Beds',
			url: '/building/wards',
		},
		{
			position: 3,
			icon: 'locate',
			name: 'View Current Building',
			url: '/building/view',
		},
		{
			position: 4,
			icon: 'locate',
			name: 'All Buildings',
			url: '/building',
		},
	],
	'Analytics & Data': [
		{
			position: 1,
			icon: 'bank-account',
			name: 'Revenue',
			url: '/analytics/revenue',
		},
		{
			position: 2,
			icon: 'download',
			name: 'Download Data',
			url: '/analytics/download',
		},
		{
			position: 3,
			icon: 'delete',
			name: 'Purge Database',
			url: '/analytics/delete',
		},
	],
};

const AdminPaths = [
	'/',
	...Object.values(AdminMenu)
		.flat()
		.map(({ url }: { url: string }) => url),
	'/admission/[admission_id]',
	'/admission/[admission_id]/transactions',
	'/user/edit/[user_id]',
	'/building/edit/[building_id]',
];

const OperatorPaths = [
	'/',
	...Object.values(OperatorMenu)
		.flat()
		.map(({ url }: { url: string }) => url),
	'/admission/[admission_id]',
	'/admission/[admission_id]/transactions',
];

const AuthRules = {
	admin: AdminPaths,
	operator: OperatorPaths,
	manager: AdminPaths,
};

export default AuthRules;
