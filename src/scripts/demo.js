/**
 * @typedef {object} MockUser
 * @property {string} user
 * @property {{
 * 		broadcaster: boolean,
 * 		founder: boolean,
 * 		mod: boolean,
 * 		subscriber: boolean,
 * 		vip: boolean
 * }} roles
 * @property {userColor} [string]
 */

const MOCK_COMFY = (function () {
	const COMMON_COLORS = ['#ff0000', '#0000ff', '#008000', '#b22222', '#ff7f50', '#9ACD32', '#FF4500', '#2E8B57', '#DAA520', '#D2691E', '#5F9EA0', '#1E90FF', '#FF69B4', '#8A2BE2', '#00FF7F']
	
	const GLOBAL_EMOTES = [
		{name: 'VirtualHug', id: '301696583'},
		{name: 'StinkyGlitch', id: '304486324'},
		{name: 'TwitchUnity', id: '196892'},
		{name: 'MorphinTime', id: '156787'},
		{name: 'bleedPurple', id: '62835'},
		{name: 'SeemsGood', id: '64138'},
		{name: 'BibleThump', id: '86'},
		{name: '<3', id: '555555584'},
		{name: ':p', id: '555555593'},
		{name: ';)', id: '555555589'},
		{name: ':D', id: '555555560'},
		{name: ':)', id: '1'},
		{name: 'kdubHappier', id: 'emotesv2_f66f18cc38174ef8868e0799f2985dc1'},
		{name: 'enigmaZone', id: 'emotesv2_0806455ae50b4f09b4bac6a8e117b74c'},
	];

	/**
	 * Selects a random element from an element
	 * @param {any[]} array 
	 */
	function _choose(array) {
		if (array && array.length > 0) {
			const index = Math.floor(Math.random() * array.length);
			return array[index];
		}
	}

	/**
	 * Generates a realistic user, with potential roles and user color.
	 * @returns {MockUser}
	 */
	function _generateUser() {
		const user = faker.internet.userName().replace(/\./g, '');
		const subscriber = Math.random() < 0.33;
		const founder = subscriber && Math.random() < 0.33;
		const vip = Math.random() < 0.2;
		const userColor = Math.random() < 0.7 ? _choose(COMMON_COLORS) : undefined;

		return {
			user,
			userColor,
			roles: {
				broadcaster: false,
				mod: false,
				founder,
				subscriber,
				vip
			}
		}
	}

	const mods = ['', '', ''].map(() => {
		const moderator = _generateUser();
		moderator.roles.mod = true;
		return moderator;
	});

	const twenty = new Array(20).fill('');
	const viewers = twenty.map(_generateUser);

	const broadcaster = _generateUser();
	broadcaster.roles = {broadcaster: true, mod: false, subscriber: false, founder: false, vip: false};
	
	const allUsers = [broadcaster, ...mods, broadcaster, ...viewers, broadcaster];

	const comfy = {
		/**
		 * @param {string} user 
		 * @param {string} messageContents 
		 * @param {object} flags 
		 * @param {object} self
		 * @param {{userState: object}} extra 
		 */
		onChat(user, messageContents, flags, self, extra) {},

		/**
		 * @param {string} id
		 * @param {object} extra 
		 */
		onMessageDeleted(id, extra) {},

		/**
	 	 * @param {string[]} [channelNames] 
	 	 */
		Init(_, __, channelNames) {
			if (channelNames.length) {
				broadcaster.user = channelNames[0];
			}
			setTimeout(_generateNextMessage, 500);
		}
	};

	const messages = [];
	/**
	 * Generates a realistic message and "sends" it
	 */
	function _generateNextMessage() {
		// Generate message
		let chatter = _choose(allUsers);
		let numSentences = Math.floor(Math.random() * 3) + 1;
		let messageContents = faker.lorem.sentences(numSentences);

		const extra = {
			id: faker.random.uuid(),
			userState: {},
			userColor: chatter.userColor
		};

		// Randomly mention users
		if (Math.random() < 0.25) {
			const words = messageContents.split(' ');
			const index = _choose(words);
			const mentionedUser = _choose(allUsers);
			const mention = `@${mentionedUser.user}`;
			words[index] = mention;
			messageContents = words.join(' ');
		}

		// Randomly reply to recent messages
		let isReply = false;
		if (Math.random() < 0.25 && messages.length) {
			isReply = true;
			const recentMessages = messages.slice(-5);
			const replied = _choose(recentMessages);
			const [repliedUser, replyBody, , , replyExtra] = replied;
			if (!replyExtra.userState['reply-parent-msg-id']) {
				extra.userState['reply-parent-msg-id'] = replyExtra.id;
				extra.userState['reply-parent-msg-body'] = replyBody;
				extra.userState['reply-parent-display-name'] = repliedUser;
				messageContents = `@${repliedUser} ${messageContents}`;
			}
		}

		// Randomly add emotes
		if (Math.random() < 0.3) {
			/** @type {string[]} */
			const words = messageContents.split(' ');
			const minimumIndex = isReply ? 1 : 0;
			do {
				const index = Math.max(minimumIndex, Math.floor(Math.random() * words.length));
				/** @type {{name: string, id: string}} */
				const chosenEmote = _choose(GLOBAL_EMOTES);
				words.splice(index, 0, chosenEmote.name);
			} while (Math.random() < 0.15)
			messageContents = words.join(' ');

			extra.messageEmotes = {};
			for (const emote of GLOBAL_EMOTES) {
				let position = 0;
				while (messageContents.indexOf(emote.name, position) !== -1) {
					if (!extra.messageEmotes[emote.id]) {
						extra.messageEmotes[emote.id] = [];
					}

					const start = messageContents.indexOf(emote.name, position);
					const end = start + emote.name.length - 1;
					extra.messageEmotes[emote.id].push(`${start}-${end}`);
					position = end;
				}
			}
		}

		// Publish message
		const message = [chatter.user, messageContents, chatter.roles, null, extra];
		messages.push(message);
		comfy.onChat(...message);

		// Ready up the next message
		let duration = Math.floor(Math.random() * 4) + 3;
		setTimeout(_generateNextMessage, duration * 1000);
	}

	/**
	 * @param {string} id
	 * @param {object} extra 
	 */
	comfy.onMessageDeleted = function(id, extra) {}

	return comfy;
})();

window.ComfyJS = MOCK_COMFY;