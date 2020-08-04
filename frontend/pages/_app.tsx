import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	whyDidYouRender(React, { trackAllPureComponents: true });
}

const MyApp = (props: AppProps) => {
	const { Component, pageProps } = props;

	return (
		<>
			<Head>
				<title>IPM</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Amiko&family=Exo+2:wght@300&display=swap"
					rel="stylesheet"
				/>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
