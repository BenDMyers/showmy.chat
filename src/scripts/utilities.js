/**
 * Removes all messages sent by a given user from the overlay.
 * Called when a user is banned.
 * 
 * @param {string} username - account whose messages to remove from the overlay
 */
export function removeAllMessagesFromUser(username) {
	const messagesFromUser = Array.from(document.querySelectorAll(`[data-twitch-chat-sender="${username}" i]`));
	messagesFromUser.forEach(removeMessageFromDomAndShiftOthers);
}

/**
 * Removes a specified message from the overlay.
 * 
 * @param {Element} messageToDelete - list item containing a message to be removed from the overlay
 */
export function removeMessageFromDomAndShiftOthers(messageToDelete) {
	// If this message was the first in a cluster sent by one person, mark the next message in the group as the first
	const wasFirstInGroup = messageToDelete.getAttribute('data-twitch-first-message-in-group');
	const group = messageToDelete.getAttribute('data-twitch-message-group');
	const hasNextInGroup = messageToDelete.nextSibling && messageToDelete.nextSibling.getAttribute('data-twitch-message-group') === group;
	if (wasFirstInGroup && hasNextInGroup) {
		messageToDelete.nextSibling.setAttribute('data-twitch-first-message-in-group', true);
	}

	// Remove the deleted message
	messageToDelete.remove();
}