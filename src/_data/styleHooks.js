/**
 * @typedef {object} ChatboxNode - Object which represents style hook documentation for a node in the chatbox
 * @property {string} name - Name of node (likely a simplified version of the node's markup) which can be used in headings and captions
 * @property {string} description - Description of node
 * @property {Attribute[]} [attributes] - List of attributes which can be found on the given element. The main "identifying" attribute should be first, and the rest should be arranged alphabetically.
 * @property {ClassName[]} [classes] - CSS classes applied to element. Should be arranged alphabetically.
 * @property {ChatboxNode[]} [children] - Representation of style hook documentation for any child elements within the current element. Should be arranged in DOM order.
 */

/**
 * @typedef {object} Attribute - Object which describes an attribute (typically a data attribute) which can be found on a given node.
 * @property {string} name - Attribute name
 * @property {string} present - Descriptions of conditions under which this attribute will be applied to the given element.
 * @property {string} value - Description of possible values this attribute could take
 * @property {string[]} use - Descriptions of possible ways this style hook could be used as a selector (each string is its own line)
 */

/**
 * @typedef {object} ClassName - Object which describes a CSS class which can be found on a given node.
 * @property {string} name - CSS class name
 * @property {string} present - Descriptions of conditions under which this class will be applied to the given element.
 * @property {string} value - Description of possible values this class could take
 * @property {string[]} use - Descriptions of possible ways this style hook could be used as a selector (each string is its own line)
 */

/** @type {ChatboxNode[]} */
module.exports = [
	{
		name: '<ul data-twitch-chat>',
		description:
			'Represents the entire chatbox. New messages are appended as list items to the end of the list.',
		attributes: [
			{
				name: 'data-twitch-chat',
				present: 'Always',
				value: 'Channel name',
				use: [
					'`[data-twitch-chat]` to style the entire chatbox',
					'`[data-twitch-chat="ChannelName"]` to style a specific streamer\'s chatbox (not recommended for public themes)',
				],
			},
		],
		children: [
			{
				name: '<li data-twitch-message>',
				description:
					'Represents a single chat message, including the sender name, message body, and (when applicable) a snippet of the message being replied to.',
				attributes: [
					{
						name: 'data-twitch-message',
						present: 'Always',
						value: `Message's unique identifier`,
						use: ['`[data-twitch-message]` to style the entire message'],
					},
					{
						name: 'data-twitch-command',
						present: 'Whenever the message is a chat command',
						value: 'Command name without the exclamation mark',
						use: [
							'`[data-twitch-command]` to style all messages that are chat commands',
							'`[data-twitch-command="uptime"]` to style a specific command',
						],
					},
					{
						name: 'data-twitch-command-has-message',
						present: 'Whenever the message is a chat command',
						value: 'Command name without the exclamation mark',
						use: [
							'`[data-twitch-command]` to style all messages that are chat commands',
							'`[data-twitch-command="uptime"]` to style a specific command',
						],
					},
					{
						name: 'data-twitch-first-message-in-group',
						present: `Whenever the given message's sender is not the same as the one before it (i.e. new sender)`,
						value: '`true` if present',
						use: [
							'`[data-twitch-first-message-in-group]` to style the first message with a new sender',
							'`[data-twitch-message]:not([data-twitch-first-message-in-group])` to style subsequent messages until the sender changes',
						],
					},
					{
						name: 'data-twitch-message-group',
						present: 'Always',
						value: 'A number',
						use: ['Not recommended as a style hook'],
					},
					{
						name: 'data-twitch-sender',
						present: 'Always',
						value: 'Sender name',
						use: [
							'`[data-twitch-sender="nightbot" i]` to style all messages from a specific account',
						],
					},
					{
						name: 'data-twitch-sender-color',
						present:
							'Whenever the sender has specified a color to appear as in Twitch chat',
						value: 'A hex code',
						use: [
							'`[data-twitch-sender-color]` to style any messages by users who have specified their chat color',
							'`[data-twitch-message]:not([data-twitch-sender-color])` to style any messages by users who have not specified their chat color',
						],
					},
					{
						name: 'data-twitch-sender-color-lightness',
						present:
							'Whenever the sender has specified a color to appear as in Twitch chat',
						value: '`light` or `dark`',
						use: [
							'`[data-twitch-sender-color-lightness="light"]` to target messages sent by users who have specified a light chat color',
							'`[data-twitch-sender-color-lightness="dark"]` to target messages sent by users who have specified a dark chat color',
						],
					},
					{
						name: 'data-twitch-sender-first-message',
						present: `Whenever this is the sender's first message sent in this channel`,
						value: '`true` if present',
						use: [
							'`[data-twitch-sender-first-message]` to style first-time messages',
						],
					},
					{
						name: 'data-twitch-sender-roles',
						present: 'Whenever the sender has a role',
						value:
							'A space-separated list of the following roles, as applicable: `broadcaster`, `founder`, `mod`, `subscriber`, `vip`',
						use: [
							'`[data-twitch-sender-roles~="subscriber"]` to style messages sent by users with a specific role',
						],
					},
				],
			},
		],
	},
];
