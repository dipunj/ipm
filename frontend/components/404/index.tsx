import { Button } from '@blueprintjs/core';
import React from 'react';
import Link from 'next/link';
import { HeaderText, NotFound, Wrapper } from './styles';

const CustomErrorPage = (): JSX.Element => {
	return (
		<div
			className="column align-center justify-center"
			style={{ height: 'calc(100vh - var(--header-height))' }}
		>
			<HeaderText>Lost ?</HeaderText>
			<Wrapper>
				<NotFound src="/images/404.svg" />
			</Wrapper>
			<Link href="/">
				<Button large outlined intent="danger" className="form-cta-margin">
					Take me Home
				</Button>
			</Link>
		</div>
	);
};

export default CustomErrorPage;
