const {EleventyServerlessBundlerPlugin} = require('@11ty/eleventy');

// const twitchChat = require('eleventy-plugin-twitch-chat');
const injectComfy = require(`${process.cwd()}/src/plugin/src/inject-comfy`);
const addTwitchChat = require(`${process.cwd()}/src/plugin/src/twitch-chat-shortcode`);

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: 'serverless',
		functionsDir: './netlify/functions',
		inputDir: './src'
	});

	// eleventyConfig.addPlugin(twitchChat);
	eleventyConfig.addTransform('inject-comfy', injectComfy);
	eleventyConfig.addShortcode('twitchChat', addTwitchChat);

	eleventyConfig.addPassthroughCopy('src/plugin');
	eleventyConfig.addPassthroughCopy('src/themes');

	return {
		dir: {
			input: 'src'
		}
	};
};