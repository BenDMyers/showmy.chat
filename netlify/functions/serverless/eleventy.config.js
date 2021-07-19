const {EleventyServerlessBundlerPlugin} = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: 'serverless',
		functionsDir: './netlify/functions',
		inputDir: './src'
	});

	return {
		dir: {
			input: 'src'
		}
	};
};