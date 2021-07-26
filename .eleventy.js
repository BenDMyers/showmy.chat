const {EleventyServerlessBundlerPlugin} = require('@11ty/eleventy');
const {isWebUri} = require('valid-url');

// const twitchChat = require('eleventy-plugin-twitch-chat');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: 'serverless',
		functionsDir: './netlify/functions',
		inputDir: './src',
		copy: ['src/themes/']
	});

	// eleventyConfig.addPlugin(twitchChat);

	eleventyConfig.addPassthroughCopy('src/scripts');
	eleventyConfig.addPassthroughCopy('src/themes');

	eleventyConfig.addFilter('debug', output => JSON.stringify(output, null, 2));
	eleventyConfig.addFilter('toStylesheet', toStylesheet)

	return {
		dir: {
			input: 'src'
		}
	};
};

/**
 * Takes chosen theme and determines stylesheet href
 * @param {string} theme chosen theme
 * @param {{
 * 		list: string[],
 * 		normalized: Object<string, true>
 * }}
 * @returns {string} valid href for chosen theme
 */
 function toStylesheet(theme = 'default', themes) {
	if (isWebUri(theme)) {
		return theme;
	} else if (themes.normalized[theme]) {
		return `/themes/${theme}.css`;
	} else {
		return `/themes/default.css`;
	}
}