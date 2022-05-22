const {EleventyServerless} = require('@11ty/eleventy');
const cleanseQueryParameters = require('./cleanse-query-parameters');
// Explicit dependencies for the bundler from config file and global data.
// The file is generated by the Eleventy Serverless Bundler Plugin.
require('./eleventy-bundler-modules.js');

/**
 * @type {import('@netlify/functions').Handler}
 */
async function handler(event) {
	console.dir({path: event.path, ...event.queryStringParameters});
	const queryParameters = cleanseQueryParameters(event.queryStringParameters);

	let elev = new EleventyServerless('serverless', {
		path: event.path,
		query: queryParameters,
		inputDir: './src',
		functionsDir: './netlify/functions',
	});

	try {
		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'text/html; charset=UTF-8',
			},
			body: await elev.render(),
		};
	} catch (error) {
		if (elev.isServerlessUrl(event.path)) {
			console.log('Serverless Error:', error);
		}

		return {
			statusCode: error.httpStatusCode || 500,
			body: JSON.stringify({error: error.message}, null, 2),
		};
	}
}

exports.handler = handler;
