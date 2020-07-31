import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

import '../styles/index.css';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	whyDidYouRender(React, { trackAllPureComponents: true });
}

export default ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};
