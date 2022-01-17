module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
	rules: {
		'declaration-block-no-redundant-longhand-properties': null,
	},
	overrides: [
		{
			files: ['**/*.html'],
			customSyntax: 'postcss-html',
		},
	],
};
