import {addChatMiddleware} from './chatMiddleware.mjs';

/**
 * @callback OnChatMiddleware
 * @param {{user: string, messageContents: string, flags: object, extra: object}} messageDetails provided information about the chat message
 * @param {Element} [messageElement] HTML node for the provided message
 */

/** @type {OnChatMiddleware} */
function piggybackOffStreamlabsFollowAlert(messageDetails, messageElement) {
	if (
		messageDetails.user === 'Streamlabs' &&
		messageDetails.messageContents.includes('Thank you for following')
	) {
		const newFollower = messageDetails.messageContents
			.replace('Thank you for following', '')
			.replace(/\W/g, '');
		console.log(newFollower);
		alert(newFollower + ' followed!');
	}
}

/** @type {OnChatMiddleware} */
function piggybackOffStreamElementsFollowAlert(messageDetails, messageElement) {
	if (
		messageDetails.user === 'StreamElements' &&
		messageDetails.messageContents.includes('Thank you for following')
	) {
		const [newFollower] = messageDetails.messageContents
			.replace('Thank you for following', '')
			.trim()
			.split();
		console.log(newFollower);
		alert(newFollower + ' followed!');
	}
}

addChatMiddleware(piggybackOffStreamlabsFollowAlert);
addChatMiddleware(piggybackOffStreamElementsFollowAlert);
