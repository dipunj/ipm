import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/index.css';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import getDefaultLayout from '../library/Layout';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	whyDidYouRender(React, { trackAllPureComponents: false });
}

const MyApp = (props: AppProps) => {
	const { Component, pageProps } = props;

	// use the getLayout function to get the layout of the page
	const getLayout = Component.getLayout || ((page) => getDefaultLayout(page));

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
			{getLayout(<Component {...pageProps} />)}
		</>
	);
};

export default MyApp;
