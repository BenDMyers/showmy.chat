const {JSDOM} = require('jsdom');
const fs = require('fs');

/**
 * Eleventy transform which injects a ComfyJS import `<script>` tag into the `<head>` of any HTML pages which inject Twitch chats.
 * @param {String} content - contents of file to be transformed
 * @param {String} outputPath - transformed file's filename
 * @returns {String} transformed file contents with potentially injected ComfyJS script
 */
function injectComfy(content, outputPath) {
	// if (!outputPath.endsWith('.html')) {
	// 	return content;
	// }

	const dom = new JSDOM(content);
	const document = dom.window.document;

	const hasInjectedTwitchChat = !!document.querySelector('[data-twitch-chat]');

	if (hasInjectedTwitchChat) {
		const comfy = document.createElement('script');
		comfy.setAttribute('src', 'https://cdn.jsdelivr.net/npm/comfy.js@latest/dist/comfy.min.js');

		document.head.appendChild(comfy);

		const chatScript = document.createElement('script');
		chatScript.innerHTML = fs.readFileSync(`${__dirname}/scripts/handleChat.js`, 'utf-8');
		document.body.appendChild(chatScript);
	}

	return dom.serialize();
}

module.exports = injectComfy;