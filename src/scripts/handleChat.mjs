/* global ComfyJS */

// import {
// 	replaceKeywordWithBttvEmoteImage,
// 	getBttvImageUrl,
// 	getTwitchUserId,
// 	getBttvChannelEmoteDict,
// 	addGlobalBttvEmotesToDict,
// } from './bttvIntegration.mjs';

import {hexCodeToHsl, hexCodeToRgb, isLightOrDark} from './color.mjs';
import {removeAllMessagesFromUser, removeMessage} from './utilities.mjs';

const chatbox = document.querySelector('[data-twitch-chat]');
const watchedChannels = chatbox.getAttribute('data-twitch-chat');

let mostRecentSender = '';
let currentMessageGroup = 0;
// let bttvEmoteDict = {};

/**
 * Sanitizes HTML string.
 *
 * @see https://gist.github.com/Eotones/0d8813c44276cce0f6b7f7e429fce602
 * @param {string | string[]} html full HTML string for a message
 * @returns {string} provided HTML with certain characters sanitized as HTML entities.
 */
function htmlEntities(html) {
	/**
	 * Iterates over each character of the HTML and replace with a corresponding HTML entity if necessary.
	 *
	 * @returns {string[]} array of HTML characters and entities
	 */
	function it() {
		return html.map(
			/**
			 * @param {string} n character
			 * @param {number} i index in array
			 * @param {string[]} arr array of characters
			 * @returns {string} character or its corresponding entity
			 */
			function (n, i, arr) {
				if (n.length === 1) {
					return n.replace(/[\u00A0-\u9999<>&]/gim, function (i) {
						return '&#' + i.charCodeAt(0) + ';';
					});
				}
				return n;
			}
		);
	}
	var isArray = Array.isArray(html);
	if (!isArray) {
		html = html.split('');
	}
	html = it(html);
	if (!isArray) html = html.join('');
	return html;
}

const emoteFormat = window.CONFIG.disableAnimatedEmotes ? 'static' : 'default';

/**
 * Replace emote names with corresponding `<img>` tags
 *
 * @param {string} text - message contents
 * @param {Object<string, string[]>} emotes - object which details which emote IDs can be found at which substring ranges in the message
 * @returns {string} message with valid emotes replaced with `<img>` tags
 */
function formatEmotes(text, emotes = {}) {
	// Characters of message body
	let splitText = text.split('');

	for (const emoteId in emotes) {
		const emoteSrc = `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/${emoteFormat}/light/3.0`;

		const ranges = emotes[emoteId];
		ranges.forEach((range) => {
			const [startStr, endStr] = range.split('-');
			const start = Number.parseInt(startStr);
			const end = Number.parseInt(endStr);

			const emoteName = text.substring(start, end + 1);
			const markup = `<img alt="${emoteName}" data-twitch-emote="${emoteName}" data-twitch-emote-id="${emoteId}" src="${emoteSrc}">`;

			// Remove emote name and insert emote markup without changing splitText's array length
			// (Not changing the array length makes it easier to manage indexing)
			const emptyPaddingElements = Array(emoteName.length - 1).fill(''); // the -1 accounts for the extra markup element getting added
			splitText.splice(
				start,
				emoteName.length,
				// Insert tag and enough empty strings to ensure splitText's length stays the same
				markup,
				...emptyPaddingElements
			);
		});
	}
	return htmlEntities(splitText).join('');
}

// /**
//  * @param {string} text message text
//  */
// function formatBttvEmotes(text) {
// 	for (const key in bttvEmoteDict) {
// 		if (text.includes(key)) {
// 			const bttvId = bttvEmoteDict[key];
// 			text = replaceKeywordWithBttvEmoteImage(
// 				text,
// 				key,
// 				getBttvImageUrl(bttvId),
// 				bttvId
// 			);
// 		}
// 	}
// 	return text;
// }

/**
 * @param {string} messageContents full message body
 * @returns {string} message with any user mentioned wrapped in <mark> tags
 */
function formatUserMentions(messageContents) {
	/**
	 * OBS 27.1.3 uses v75 of embedded chrome which has the following bug:
	 * https://stackoverflow.com/questions/56499440/chrome-75-regexp-s-matches-strange-unicode-range
	 * The result is that using /@([\w]+)/g as a regex will not match 's' or 'S' and instead return early.
	 * This will be fixed in OBS 27.2, but this regex will match both &#83; (S) and &#115; (s) and will not cut things off.
	 */
	return messageContents.replace(
		/@(([\w]|&#83;|&#115;)+)/g,
		function (substring, mentionedUser) {
			return `<mark data-twitch-mentioned-user="@${mentionedUser}">@${mentionedUser}</mark>`;
		}
	);
}

/**
 * @param {string} messageContents full message body
 * @returns {string} message with the chat command wrapped in a <mark> tag
 */
function formatChatCommand(messageContents) {
	const COMMAND_REGEX = /^!(([\w]|&#83;|&#115;)+)/;
	return messageContents.replace(COMMAND_REGEX, function (substring, command) {
		return `<mark class="twitch-chat-command" data-twitch-command-inner="!${command}">!${command}</mark>`;
	});
}

// /**
//  * @param {string} messageContents
//  * @returns {string} message with any links wrapped in <a href>
//  */
// function formatLinks(messageContents) {
// 	const urlRegex =
// 		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
// 	return messageContents.replace(urlRegex, function (link) {
// 		return `<a href="${link}">${link}</a>`;
// 	});
// }

ComfyJS.onChat = function (user, messageContents, flags, self, extra = {}) {
	// If sender is blocklisted, don't even think about doing the rest of this
	const hideSender =
		Array.isArray(window.CONFIG.hideMessagesFrom) &&
		window.CONFIG.hideMessagesFrom.includes(user.toLowerCase());
	if (hideSender) return;

	// Assemble message node
	const newMessage = document.createElement('li');

	const sender = document.createElement('div');
	sender.classList.add('twitch-chat-sender');
	sender.setAttribute('data-twitch-sender-inner', user);
	sender.innerHTML = user;

	const message = document.createElement('div');
	let formattedMessage = formatEmotes(messageContents, extra.messageEmotes);
	// formattedMessage = formatBttvEmotes(formattedMessage);
	// formattedMessage = formatLinks(formattedMessage);
	formattedMessage = formatUserMentions(formattedMessage);
	if (extra._isCommand) {
		formattedMessage = formatChatCommand(formattedMessage);
		newMessage.setAttribute('data-twitch-command', extra._commandName);
		if (extra._commandHasBody) {
			newMessage.setAttribute('data-twitch-command-has-message', true);
		}
	}

	message.innerHTML = formattedMessage;
	message.classList.add('twitch-chat-message');

	if (extra.userState['reply-parent-msg-id']) {
		const replyPreview = document.createElement('small');
		replyPreview.setAttribute(
			'data-twitch-message-reply',
			extra.userState['reply-parent-msg-id']
		);
		const repliedMessage = extra.userState['reply-parent-msg-body'].replace(
			/\\s/g,
			' '
		);
		replyPreview.innerHTML = `Replying to <span data-twitch-replied-user="@${extra.userState['reply-parent-display-name']}">@${extra.userState['reply-parent-display-name']}</span>: ${repliedMessage}`;
		newMessage.appendChild(replyPreview);
	}

	newMessage.appendChild(sender);
	newMessage.appendChild(message);

	newMessage.setAttribute('data-twitch-message', extra.id);
	newMessage.setAttribute('data-twitch-sender', user);

	// Apply style hooks
	const senderRoles = [];
	if (flags.broadcaster) senderRoles.push('broadcaster');
	if (flags.founder) senderRoles.push('founder');
	if (flags.mod) senderRoles.push('mod');
	if (flags.subscriber) senderRoles.push('subscriber');
	if (flags.vip) senderRoles.push('vip');
	if (senderRoles.length > 0) {
		newMessage.setAttribute('data-twitch-sender-roles', senderRoles.join(' '));
	}

	const messageStatus = [];
	if (flags.highlighted) messageStatus.push('highlighted');
	if (flags.customReward) messageStatus.push('customReward');
	if (extra.messageType === 'action') messageStatus.push('action');
	if (messageStatus.length > 0) {
		newMessage.setAttribute(
			'data-twitch-message-status',
			messageStatus.join(' ')
		);
	}

	if (extra.userColor) {
		newMessage.setAttribute('data-twitch-sender-color', extra.userColor);
		const {r, g, b} = hexCodeToRgb(extra.userColor);
		const {h, s, l} = hexCodeToHsl(extra.userColor);
		const saturationPercent = +(s * 100).toFixed(1) + '%';
		const lightnessPercent = +(l * 100).toFixed(1) + '%';

		newMessage.setAttribute(
			'style',
			`--twitch-sender-color: ${extra.userColor}; --twitch-sender-color-rgb: ${r} ${g} ${b}; --twitch-sender-color-red: ${r}; --twitch-sender-color-green: ${g}; --twitch-sender-color-blue: ${b}; --twitch-sender-color-hsl: ${h} ${saturationPercent} ${lightnessPercent}; --twitch-sender-color-hue: ${h}; --twitch-sender-color-saturation: ${saturationPercent}; --twitch-sender-color-lightness: ${lightnessPercent};`
		);

		const senderColorLightness = isLightOrDark(extra.userColor);
		newMessage.setAttribute(
			'data-twitch-sender-color-lightness',
			senderColorLightness
		);
	}

	if (extra.userState['first-msg']) {
		newMessage.setAttribute('data-twitch-sender-first-message', true);
	}

	if (extra.isEmoteOnly) {
		newMessage.setAttribute('data-twitch-emote-only', true);
	}

	if (user !== mostRecentSender) {
		mostRecentSender = user;
		currentMessageGroup++;
		newMessage.setAttribute('data-twitch-first-message-in-group', true);
	}
	newMessage.setAttribute('data-twitch-message-group', currentMessageGroup);

	chatbox.appendChild(newMessage);

	if (window.CONFIG.clearMessageAfter) {
		setTimeout(() => {
			removeMessage(extra.id);
		}, window.CONFIG.clearMessageAfter);
	}

	// Optionally, users may specify a max number of messages to show.
	// If we exceed that number, remove the oldest still shown message.
	/** @type {{showLatestMessages?: number}} */
	const {showLatestMessages} = window.CONFIG;
	if (showLatestMessages) {
		const oldestMessageSelector =
			'[data-twitch-message]:not([data-twitch-message-display-status="deleting"])';
		while (
			document.querySelectorAll(oldestMessageSelector).length >
			showLatestMessages
		) {
			const oldestMessage = document.querySelector(oldestMessageSelector);
			const oldestMessageId = oldestMessage.getAttribute('data-twitch-message');
			removeMessage(oldestMessageId);
		}
	}
};

ComfyJS.onCommand = function (user, command, message, flags, extra = {}) {
	const showAnyCommands = window.CONFIG.showCommands === true;
	const showAllowedCommands = Array.isArray(window.CONFIG.showCommands);
	const showThisCommand =
		showAnyCommands ||
		(showAllowedCommands && window.CONFIG.showCommands.includes(command));

	if (showThisCommand) {
		const augmentedExtra = {
			...extra,
			_isCommand: true,
			_commandName: command,
			_commandHasBody: !!message,
		};
		ComfyJS.onChat(user, `!${command} ${message}`, flags, null, augmentedExtra);
	}
};

ComfyJS.onMessageDeleted = function (id, extra) {
	removeMessage(id);
};

ComfyJS.onBan = function (bannedUsername, extra) {
	removeAllMessagesFromUser(bannedUsername);
};

ComfyJS.onTimeout = function (timedOutUsername, durationInSeconds, extra) {
	removeAllMessagesFromUser(timedOutUsername);
};

/**
 * Fetches necessary user data and begins listening for chat messages
 */
async function init() {
	// const twitchUserId = await getTwitchUserId(watchedChannels.split(' ')[0]);
	// bttvEmoteDict = await getBttvChannelEmoteDict(twitchUserId);
	// bttvEmoteDict = await addGlobalBttvEmotesToDict(bttvEmoteDict);
	ComfyJS.Init(null, null, watchedChannels.split(' '));
}

init();
