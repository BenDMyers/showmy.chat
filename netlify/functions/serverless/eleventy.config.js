const {EleventyServerlessBundlerPlugin} = require('@11ty/eleventy');
const twitchChat = require('eleventy-plugin-twitch-chat');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: 'serverless',
		functionsDir: './netlify/functions',
		inputDir: './src'
	});

	eleventyConfig.addPlugin(twitchChat);

	eleventyConfig.setTemplateFormats(['md', 'css']);
	eleventyConfig.addWatchTarget('*.css');

	return {
		dir: {
			input: 'src'
		}
	};
};