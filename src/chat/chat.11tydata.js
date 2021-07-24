// const validUrl = require('valid-url');

/**
 * Takes chosen theme and determines stylesheet href
 * @param {{
 * 		theme: string,
 * 		themes: {
 * 			list: string[],
 * 			normalized: Object<string, true>
 * 		}
 * }} data
 * @returns {string} valid href for chosen theme
 */
// function parseTheme({theme, themes}) {
// 	if (validUrl.isWebUri(theme)) {
// 		return theme;
// 	} else if (themes.normalized[theme]) {
// 		return `/themes/${theme}.css`;
// 	} else {
// 		return `/themes/default.css`;
// 	}
// }

module.exports = {
	theme: 'default',
	permalink: {
		serverless: '/c/:channel.html'
	}
	// eleventyComputed: {
	// 	themeStylesheet: data => parseTheme(data.theme)
	// }
}