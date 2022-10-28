/* global faker */

/**
 * @typedef {object} MockUser
 * @property {string} user The name of a user
 * @property {{
 * 		broadcaster: boolean,
 * 		founder: boolean,
 * 		mod: boolean,
 * 		subscriber: boolean,
 * 		vip: boolean
 * }} roles The roles for the current user
 * @property {string} [userColor] hex code representing the user's chosen chat appearance color
 */

const MOCK_COMFY = (function () {
	const COMMON_COLORS = [
		'#ff0000',
		'#0000ff',
		'#008000',
		'#b22222',
		'#ff7f50',
		'#9ACD32',
		'#FF4500',
		'#2E8B57',
		'#DAA520',
		'#D2691E',
		'#5F9EA0',
		'#1E90FF',
		'#FF69B4',
		'#8A2BE2',
		'#00FF7F',
	];

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
	 *
	 * @template Item
	 * @param {Item[]} array any list of elements
	 * @returns {Item} randomly selected element
	 */
	function _choose(array) {
		if (array && array.length > 0) {
			const index = Math.floor(Math.random() * array.length);
			return array[index];
		}
	}

	/**
	 * Generates a realistic user, with potential roles and user color.
	 *
	 * @returns {MockUser} realistically generated user
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
				vip,
			},
		};
	}

	const mods = ['', '', ''].map(() => {
		const moderator = _generateUser();
		moderator.roles.mod = true;
		return moderator;
	});

	const twenty = new Array(20).fill('');
	const viewers = twenty.map(_generateUser);

	const broadcaster = _generateUser();
	broadcaster.roles = {
		broadcaster: true,
		mod: false,
		subscriber: false,
		founder: false,
		vip: false,
	};

	const allUsers = [broadcaster, ...mods, broadcaster, ...viewers, broadcaster];

	const comfy = {
		/**
		 * @param {string} user chatter's username, all lowercase
		 * @param {string} messageContents body of message
		 * @param {object} flags metadata about sender or message
		 * @param {object} self message
		 * @param {{userState: object}} extra metadata about sender
		 */
		onChat(user, messageContents, flags, self, extra) {},

		/**
		 * @param {string} user chatter's username, all lowercase
		 * @param {string} command name of issued chat command
		 * @param {string} messageContents body of message
		 * @param {object} flags metadata about sender or message
		 * @param {object} self message
		 * @param {{userState: object}} extra metadata about sender
		 */
		onCommand(user, command, messageContents, flags, self, extra) {},

		/**
		 * @param {string} id unique identifier for deleted message
		 * @param {object} extra metadata about message
		 */
		onMessageDeleted(id, extra) {},

		/**
		 * @param {string} __username Twitch channel to authenticate as (unused argument)
		 * @param {string} __auth OAuth token for authentication (unused argument)
		 * @param {string[]} [channelNames] list of channels whose chat we should subscribe to
		 */
		Init(__username, __auth, channelNames) {
			if (channelNames.length) {
				broadcaster.user = channelNames[0];
			}

			// send all messages at once if the demo page is static
			if (window.CONFIG.DEMO === 'static') {
				for (let i = 0; i < window.CONFIG.showLatestMessages; i++) {
					_generateNextMessage();
				}
			} else {
				setTimeout(_generateNextMessage, 500);
			}
		},
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
			userColor: chatter.userColor,
		};

		const flags = {};

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

		if (Math.random() < 0.1) {
			// Randomly highlight messages
			flags.highlighted = true;
		} else if (Math.random() < 0.08) {
			// Randomly mark messages as actions (i.e. user started message with "/me")
			extra.messageType = 'action';
		}

		// Randomly add a long-ish URL
		if (Math.random() < 0.07) {
			/** @type {string[]} */
			const words = messageContents.split(' ');
			const minimumIndex = isReply ? 1 : 0;
			const insertionIndex = Math.max(
				minimumIndex,
				Math.floor(Math.random() * words.length)
			);
			words.splice(
				insertionIndex,
				0,
				`https://www.twitch.tv/videos/1315188393`
			);
			messageContents = words.join(' ');
		}

		// Randomly add emotes
		if (Math.random() < 0.3) {
			/** @type {string[]} */
			const words = messageContents.split(' ');
			const minimumIndex = isReply ? 1 : 0;
			do {
				const index = Math.max(
					minimumIndex,
					Math.floor(Math.random() * words.length)
				);
				/** @type {{name: string, id: string}} */
				const chosenEmote = _choose(GLOBAL_EMOTES);
				words.splice(index, 0, chosenEmote.name);
			} while (Math.random() < 0.15);
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
		const message = [
			chatter.user,
			messageContents,
			{...chatter.roles, ...flags},
			null,
			extra,
		];
		messages.push(message);
		comfy.onChat(...message);

		// do not send more messages if the demo page is static
		if (window.CONFIG.DEMO !== 'static') {
			// Ready up the next message
			const nextGeneratedMessage =
				Math.random() < 0.25 ? _generateChatCommand : _generateNextMessage;

			const duration = Math.floor(Math.random() * 4) + 3;
			setTimeout(nextGeneratedMessage, duration * 1000);
		}
	}

	/**
	 * Sends a mock `!uptime` command from a random user or a mock `!so` command from the broadcaster
	 */
	function _generateChatCommand() {
		const extra = {userState: {}};

		if (Math.random() < 0.2) {
			// 1 in every 5 commands, the broadcaster shouts out someone
			extra.userColor = broadcaster.userColor;
			const mentionedUser = _choose([...mods, ...viewers]);
			const mention = `@${mentionedUser.user}`;
			messages.push([
				broadcaster.user,
				`!so ${mention}`,
				{...broadcaster.roles},
				null,
				extra,
			]);
			comfy.onCommand(
				broadcaster.user,
				'so',
				mention,
				{...broadcaster.roles},
				extra
			);
		} else {
			const randomCommenter = _choose(allUsers);
			extra.userColor = randomCommenter.userColor;
			messages.push([
				randomCommenter.user,
				'!uptime',
				{...randomCommenter.roles},
				null,
				extra,
			]);
			comfy.onCommand(
				randomCommenter.user,
				'uptime',
				'',
				{...randomCommenter.roles},
				extra
			);
		}

		const duration = Math.floor(Math.random() * 2) + 2;
		setTimeout(_generateNextMessage, duration * 1000);
	}

	return comfy;
})();

window.ComfyJS = MOCK_COMFY;
