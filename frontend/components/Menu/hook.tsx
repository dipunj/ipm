import { useRouter } from 'next/router';
import { Button } from '@blueprintjs/core';
import {
	Section,
	Title,
	Divider,
	Item,
	ItemList,
	SectionWrapper,
	DividerContainer,
} from './styles';

const useMenu = (accountType: string, callBack: () => void): JSX.Element[] => {
	const router = useRouter();

	const handleRedirect = async (target: string) => {
		await router.push(target);
		callBack();
	};

	const OperatorMenu = {
		Admission: [
			{
				position: 1,
				icon: 'plus',
				name: 'New Admission',
				onClick: () => handleRedirect('/admission/new'),
			},
			{
				position: 2,
				icon: 'filter-list',
				name: 'Active Admissions',
				onClick: () => handleRedirect('/admission/active'),
			},
			{
				position: 3,
				icon: 'history',
				name: 'Past Admissions',
				onClick: () => handleRedirect('/admission/past'),
			},
		],
		'Building Explorer': [
			{
				position: 1,
				icon: 'office',
				name: 'New Building',
				onClick: () => handleRedirect('/building/new'),
			},
		],
	};

	const AdminMenu = {
		Admission: [
			{
				position: 1,
				icon: 'plus',
				name: 'New Admission',
				onClick: () => handleRedirect('/admission/new'),
			},
			{
				position: 2,
				icon: 'filter-list',
				name: 'Active Admissions',
				onClick: () => handleRedirect('/admission/active'),
			},
			{
				position: 3,
				icon: 'history',
				name: 'Past Admissions',
				onClick: () => handleRedirect('/admission/past'),
			},
		],
		'User Management': [
			{
				position: 1,
				icon: 'people',
				name: 'All Users',
				onClick: () => handleRedirect('/user/list'),
			},
			{
				position: 2,
				icon: 'new-person',
				name: 'Create New User',
				onClick: () => handleRedirect('/user/new'),
			},
			{
				position: 3,
				icon: 'history',
				name: 'Login History',
				onClick: () => handleRedirect('/user/login-history'),
			},
		],
		'Building Management': [
			{
				position: 1,
				icon: 'office',
				name: 'New Building',
				onClick: () => handleRedirect('/building/new'),
			},
			{
				position: 2,
				icon: 'search-around',
				name: 'New Ward / Bed',
				onClick: () => handleRedirect('/building/wards'),
			},
			{
				position: 3,
				icon: '',
				name: 'View Current Building',
				onClick: () => handleRedirect('/building/view'),
			},
		],
		'Analytics & Data': [
			{
				position: 1,
				icon: 'bank-account',
				name: 'Revenue',
				onClick: () => handleRedirect('/analytics/revenue'),
			},
			{
				position: 2,
				icon: 'download',
				name: 'Download Data',
				onClick: () => handleRedirect('/analytics/download'),
			},
			{
				position: 3,
				icon: 'delete',
				name: 'Purge Database',
				onClick: () => handleRedirect('/analytics/delete'),
			},
		],
	};

	let menu = [];

	switch (accountType) {
		case 'admin':
			menu = AdminMenu;
			break;
		case 'operator':
		default:
			menu = OperatorMenu;
			break;
	}
	const sectionCount = Object.keys(menu).length;
	const menuComponent = Object.keys(menu).map((section, idx) => (
		<>
			<SectionWrapper>
				<Section key={section}>
					<Title>{section}</Title>
					<ItemList>
						{menu[section].map((action) => (
							<Item key={action.name}>
								<Button
									fill
									icon={action.icon}
									minimal
									onClick={action.onClick}
									alignText="left"
								>
									{action.name}
								</Button>
							</Item>
						))}
					</ItemList>
				</Section>
			</SectionWrapper>
			{idx !== sectionCount - 1 && (
				<DividerContainer>
					<Divider />
				</DividerContainer>
			)}
		</>
	));

	return menuComponent;
};

export default useMenu;
