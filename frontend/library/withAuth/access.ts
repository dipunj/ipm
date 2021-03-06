import { AccountType } from '../../common/types';

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
			url: '/system/revenue',
		},
		{
			position: 2,
			icon: 'download',
			name: 'System Configuration',
			url: '/system/configuration',
		},
		{
			position: 3,
			icon: 'delete',
			name: 'Reset System',
			url: '/system/reset',
		},
	],
};

const AdminPaths = [
	'/',
	...Object.values(AdminMenu)
		.flat()
		.map(({ url }: { url: string }) => url),
	'/profile/password',
	'/admission/[admission_id]',
	'/admission/[admission_id]/transactions',
	'/admission/[admission_id]/transactions/deleted',
	'/user/edit/[user_id]',
	'/building/edit/[building_id]',
	'/logs/admission/[admission_id]',
	'/logs/transaction/[transaction_id]',
];

const OperatorPaths = [
	'/',
	...Object.values(OperatorMenu)
		.flat()
		.map(({ url }: { url: string }) => url),
	'/profile/password',
	'/admission/[admission_id]',
	'/admission/[admission_id]/transactions',
];

const AuthRules: { [key in AccountType]: string[] } = {
	admin: AdminPaths,
	operator: OperatorPaths,
	manager: AdminPaths,
};

export default AuthRules;
