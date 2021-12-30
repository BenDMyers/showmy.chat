const {EleventyServerlessBundlerPlugin} = require('@11ty/eleventy');
const i18n = require('eleventy-plugin-i18n');
const {isWebUri} = require('valid-url');

const translations = require('./src/_data/translations');

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} EleventyConfig
 * @typedef {ReturnType<import('@11ty/eleventy/src/defaultConfig')>} EleventyReturnValue
 * 
 * @type {(eleventyConfig: EleventyConfig)) => EleventyReturnValue}
 */
module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: 'serverless',
		functionsDir: './netlify/functions',
		inputDir: './src',
		copy: ['src/themes/']
	});

	eleventyConfig.addPlugin(i18n, {
		translations,
		fallbackLocales: {'*': 'en'}
	});

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