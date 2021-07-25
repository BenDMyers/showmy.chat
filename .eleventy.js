const {EleventyServerlessBundlerPlugin} = require('@11ty/eleventy');

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

	eleventyConfig.addFilter('out', output => JSON.stringify(output, null, 2));

	return {
		dir: {
			input: 'src'
		}
	};
};