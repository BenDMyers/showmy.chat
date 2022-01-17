module.exports = {
	extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
	rules: {'alpha-value-notation': 'percentage'},
	overrides: [
		{
			files: ['**/*.html'],
			customSyntax: 'postcss-html',
			rules: {'alpha-value-notation': 'percentage'},
		},
	],
};
