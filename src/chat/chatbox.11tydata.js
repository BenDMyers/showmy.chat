const {titleCase} = require('title-case');

/**
 * Formats a theme's name as title case.
 *
 * @param {string} theme lowercase, dash-delimited theme name
 * @returns {string} theme name, formatted in title case
 */
function formatThemeName(theme) {
	return titleCase(theme.replace(/-/g, ' '));
}

module.exports = {
	permalink: {
		serverless: '/c/:channel',
	},
	eleventyComputed: {
		description: (data) => {
			if (!data.eleventy.serverless) {
				return 'Check out this custom chat overlay built with showmy.chat!';
			}

			const {channel} = data.eleventy.serverless.path;
			const theme =
				data.eleventy.serverless.query && data.eleventy.serverless.query.theme;

			if (theme && data.themes.normalized[theme] && theme !== 'default') {
				const formattedTheme = formatThemeName(theme);
				return `Check out ${channel}'s custom chat overlay built with showmy.chat's ${formattedTheme} theme!`;
			}

			return `Check out ${channel}'s custom chat overlay built with showmy.chat!`;
		},
	},
};
