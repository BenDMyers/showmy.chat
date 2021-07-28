const chatbox = document.querySelector('[data-twitch-chat]');
const watchedChannels = chatbox.getAttribute('data-twitch-chat');

function htmlEntities(html) {
	function it() {
		return html.map(function(n, i, arr) {
				if(n.length == 1) {
					return n.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
						return '&#'+i.charCodeAt(0)+';';
						});
				}
				return n;
			});
	}
	var isArray = Array.isArray(html);
	if(!isArray) {
		html = html.split('');
	}
	html = it(html);
	if(!isArray) html = html.join('');
	return html;
}

/**
 * 
 * @param {String} text - message contents
 * @param {Object} emotes - object which details which emote IDs can be found at which substring ranges in the message
 * @returns 
 */
function formatEmotes(text, emotes = {}) {
	let splitText = text.split('');
	for(let emoteId in emotes) {
		let e = emotes[emoteId];
		for(let j in e) {
			let mote = e[j];
			if (typeof mote == 'string') {
				mote = mote.split('-');
				mote = [parseInt(mote[0]), parseInt(mote[1])];
				let length =  mote[1] - mote[0];
				let empty = Array.apply(null, new Array(length + 1)).map(function() { return '' });
				let emoteName = text.substr(mote[0], length + 1);
				splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
				splitText.splice(mote[0], 1, `<img alt="${emoteName}" data-twitch-emote="${emoteName}" src="http://static-cdn.jtvnw.net/emoticons/v1/${emoteId}/3.0">`);
			}
		}
	}
	return htmlEntities(splitText).join('')
}

ComfyJS.onChat = function(user, messageContents, flags, self, extra) {
	const newMessage = document.createElement('li');

	const sender = document.createElement('div');
	sender.classList.add('twitch-chat-sender');
	sender.innerHTML = user;

	const message = document.createElement('div');
	message.innerHTML = formatEmotes(messageContents, extra.messageEmotes);;
	message.classList.add('twitch-chat-message');

	if (extra.userState['reply-parent-msg-id']) {
		const replyPreview = document.createElement('small');
		replyPreview.setAttribute('data-twitch-message-reply', extra.userState['reply-parent-msg-id']);
		const repliedMessage = extra.userState['reply-parent-msg-body'].replace(/\\s/g, ' ');
		replyPreview.innerHTML = `Replying to @${extra.userState['reply-parent-display-name']}: ${repliedMessage}`;
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
	if (messageStatus.length > 0) {
		newMessage.setAttribute('data-twitch-message-status', messageStatus.join(' '));
	}

	if (extra.userColor) {
		newMessage.setAttribute('data-twitch-sender-color', extra.userColor);
		newMessage.setAttribute('style', `--twitch-sender-color: ${extra.userColor}`);
	}

	chatbox.appendChild(newMessage);
}

ComfyJS.onMessageDeleted = function(id, extra) {
	const messageToDelete = document.querySelector(`[data-twitch-message="${id}"]`);
	if (messageToDelete) {
		messageToDelete.remove();
	}
}

ComfyJS.Init(null, null, watchedChannels.split(' '));