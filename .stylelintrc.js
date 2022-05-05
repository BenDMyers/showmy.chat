module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
	rules: {
		'declaration-block-no-redundant-longhand-properties': null,
		'no-descending-specificity': null,
		'declaration-block-trailing-semicolon': 'always',
	},
	overrides: [
		{
			files: ['**/*.html'],
			customSyntax: 'postcss-html',
			rules: {
				'selector-combinator-space-after': 'always',
				'selector-combinator-space-before': 'always',
			},
		},
	],
};
