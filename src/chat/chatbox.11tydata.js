const validUrl = require('valid-url');

/**
 * Takes chosen theme and determines stylesheet href
 * @param {{
 * 		eleventy?: {
 * 			serverless?: {
 * 				path: {},
 * 				query: {
 * 					theme?: string
 * 				}
 * 			}
 * 		},
 * 		themes: {
 * 			list: string[],
 * 			normalized: Object<string, true>
 * 		}
 * }} data
 * @returns {string} valid href for chosen theme
 */
function parseTheme(data) {
	let themes = data.themes;
	let theme = data.eleventy?.serverless?.query?.theme || 'default';

	if (validUrl.isWebUri(theme)) {
		return theme;
	} else if (themes.normalized[theme]) {
		return `/themes/${theme}.css`;
	} else {
		return `/themes/default.css`;
	}
}

module.exports = {
	eleventyComputed: {
		themeStylesheet: data => parseTheme(data)
	},
	permalink: {
		serverless: '/c/:channel'
	}
};