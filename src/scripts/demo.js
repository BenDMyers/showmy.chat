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
	
	/**
	 * @returns {MockUser}
	 */
	function generateUser() {
		const user = faker.internet.userName().replace(/\./g, '');
		const subscriber = Math.random() < 0.33;
		const founder = subscriber && Math.random() < 0.33;
		const vip = Math.random() < 0.2;
		const userColor = Math.random() < 0.7 ?
			COMMON_COLORS[Math.floor(Math.random() * COMMON_COLORS.length)] :
			undefined;

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
		const moderator = generateUser();
		moderator.roles.mod = true;
		return moderator;
	});

	const twenty = new Array(20).fill('');
	const viewers = twenty.map(generateUser);

	const broadcaster = generateUser();
	broadcaster.roles = {broadcaster: true, mod: false, subscriber: false, founder: false, vip: false};
	
	const allUsers = [broadcaster, ...mods, ...viewers];
	console.log({allUsers})

	const comfy = {
		channel: 'YourNameHere',

		/**
		 * 
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
	 	 * @param {string} [channelName] 
	 	 */
		Init(channelName) {
			if (channelName) {
				this.channel = channelName;
			}
	
			let duration = Math.floor(Math.random() * 4) + 3;
			setTimeout(_generateNextMessage, duration * 1000);
		}
	};

	const messages = [];
	function _generateNextMessage() {
		// Generate message
		let chatter = allUsers[Math.floor(Math.random() * allUsers.length)];
		console.log({chatter})
		let numSentences = Math.floor(Math.random() * 3) + 1;
		let messageContents = faker.lorem.sentences(numSentences);

		const extra = {
			userState: {},
			userColor: chatter.userColor
		};

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