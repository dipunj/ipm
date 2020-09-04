import { Menu, MenuItem } from '@blueprintjs/core';
import { useRouter } from 'next/router';

const ProfileOptions = ({ closeMenu }: { closeMenu: () => void }) => {
	const router = useRouter();
	const redirectToPasswordReset = async () => {
		await router.push('/profile/password');
		closeMenu();
	};
	return (
		<Menu>
			<MenuItem icon="lock" text="Change Password" onClick={redirectToPasswordReset} />
		</Menu>
	);
};

export default ProfileOptions;
