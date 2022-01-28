module.exports = {
	baseUrl: function () {
		let baseUrl = 'https://showmy.chat';

		if (process.env.ELEVENTY_ENV === 'development') {
			baseUrl = 'http://localhost:8080';
		} else if (

		/**
		 * Use environment variables supplied by Netlify's build.
		 *
		 * @see https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
		 */
			process.env.NETLIFY &&
			process.env.CONTEXT === 'deploy-preview'
		) {
			baseUrl = process.env.DEPLOY_PRIME_URL;
		} else if (process.env.NETLIFY) {
			baseUrl = process.env.URL;
		}

		return baseUrl;
	},
	/** @type {'development' | 'production'} */
	env: process.env.ELEVENTY_ENV,
};
