// nextjs also uses postcss to transform css,
// do not provide plugins in the require() function
// as stated in tailwindcss docs, since nextjs would break
// if plugins are provided

// so just use the default postcss config for nextjs and add tailwindcss plugin to it
module.exports = {
	plugins: [
		'postcss-flexbugs-fixes',
		[
			'postcss-preset-env',
			{
				autoprefixer: {
					flexbox: 'no-2009',
				},
				stage: 3,
				features: {
					'custom-properties': false,
				},
			},
		],
		'tailwindcss',
	],
};
