module.exports = {
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['prettier'],
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
	],
	env: {
		node: true,
		es2020: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'prettier/prettier': ["error", {
			singleQuote: false,
			trailingComma: "all",
			tabWidth: 4,
			useTabs: true,
			endOfLine: "auto"
		}],
	},
};
