// const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
	purge: ['./components/**/*.tsx', './library/**/*.tsx', './pages/**/*.tsx', './styles/**/*.tsx'],
	theme: {
		extend: {
			colors: {
				red: {
					100: '#fff5f5',
					200: '#fed7d7',
					300: '#feb2b2',

					400: '#fc8181',
					500: '#eb5757',
					600: '#ea3333',

					700: '#c53030',
					800: '#9b2c2c',
					900: '#742a2a',
				},
				shade: {
					100: 'var(--color-100)',
					200: 'var(--color-200)',
					300: 'var(--color-300)',

					400: 'var(--color-400)',
					500: 'var(--color-500)',
					600: 'var(--color-600)',

					700: 'var(--color-700)',
					800: 'var(--color-800)',
					900: 'var(--color-900)',
				},
			},
			fontFamily: {
				Amiko: ['Amiko'],
				Lobster: ['Lobster'],
			},
		},
	},
	// variants: {},
	// plugins: [],
};
