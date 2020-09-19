import { Button } from '@blueprintjs/core';
import React from 'react';
import Link from 'next/link';
import { HeaderText, NotFound, Wrapper } from './styles';

const CustomErrorPage = (): JSX.Element => {
	return (
		<div className="column page-content align-center">
			<HeaderText>Lost ?</HeaderText>
			<Wrapper>
				<NotFound src="/images/404.svg" />
			</Wrapper>
			<Link href="/">
				<Button large outlined intent="danger" className="form-cta-margin">
					Go To HomePage
				</Button>
			</Link>
		</div>
	);
};

export default CustomErrorPage;
