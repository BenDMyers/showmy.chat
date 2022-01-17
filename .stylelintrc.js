module.exports = {
	extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
	overrides: [
		{
			files: ['**/*.html'],
			customSyntax: 'postcss-html',
		},
	],
};
