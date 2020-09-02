import { Menu, MenuItem } from '@blueprintjs/core';
import { useRouter } from 'next/router';

const ProfileOptions = () => {
	const router = useRouter();
	const redirectToPasswordReset = () => router.push('/profile/password');
	return (
		<Menu>
			<MenuItem icon="lock" text="Change Password" onClick={redirectToPasswordReset} />
		</Menu>
	);
};

export default ProfileOptions;
