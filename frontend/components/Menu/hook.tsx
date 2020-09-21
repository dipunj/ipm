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
import { OperatorMenu, AdminMenu } from '../../library/withAuth/access';

const useMenu = (accountType: string, callBack: () => void): JSX.Element[] => {
	const router = useRouter();

	const handleRedirect = async (target: string) => {
		await router.push(target);
		callBack();
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
									onClick={() => handleRedirect(action.url)}
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
