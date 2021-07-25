/**
 * Shortcode for inserting a `<ul>` into the page to receive chat messages for the provided channel(s)
 * @param {String} channels - space-separated list of channels 
 * @returns {String} chat `<ul>` markup
 */
function addTwitchChat(channels) {
	if (!channels || typeof channels !== 'string') {
		throw new Error('twitchChat shortcode expects a channel name or space-separated list of channel names to follow.');
	}

	return `<ul data-twitch-chat="${channels}"></ul>`;
}

module.exports = addTwitchChat;