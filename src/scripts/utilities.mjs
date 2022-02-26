/**
 * Adds animation/transition listeners for a given event. Will immediately abort if there is no animation or transition.
 *
 * @param {string} eventName - the name of the event to be used. There will be data-attributes added to the element with the event name for the animation/transition event.
 * @param {HTMLElement} element - the element to apply listeners/attributes to.
 * @param {Function?} [callback] - The callback function at the end of the animation/transition. Optional.
 */
export function createAnimationHandler(eventName, element, callback) {
	const attrPrefix = (e) => `data-${eventName}-${e}`;
	element.setAttribute(attrPrefix('from'), true);

	const trackedProperties = new Set();

	const __finishAnimation = () => {
		if (trackedProperties.size === 0) {
			element.removeEventListener('transitionstart', __transitionStart);
			element.removeEventListener('transitionend', __transitionEnd);
			element.removeEventListener('animationstart', __animationStart);
			element.removeEventListener('animationend', __animationEnd);
			element.removeEventListener('animationiteration', __animationEnd);
			element.removeAttribute(attrPrefix('active'));
			element.removeAttribute(attrPrefix('to'));
			if (typeof callback === 'function') callback();
		}
	};

	const __transitionStart = (e) => {
		clearTimeout(abortCode);
		trackedProperties.add('transition:' + e.propertyName);
	};
	const __transitionEnd = (e) => {
		trackedProperties.delete('transition:' + e.propertyName);
		__finishAnimation(e.target);
	};
	const __animationStart = (e) => {
		clearTimeout(abortCode);
		trackedProperties.add('animation:' + e.propertyName);
	};

	const __animationEnd = (e) => {
		trackedProperties.delete('animation:' + e.propertyName);
		__finishAnimation(e.target);
	};

	const abortCode = setTimeout(() => {
		console.log('Aborting...');
		__finishAnimation(element);
	}, 100);

	element.addEventListener('transitionstart', __transitionStart);
	element.addEventListener('transitionend', __transitionEnd);
	element.addEventListener('animationstart', __animationStart);
	element.addEventListener('animationend', __animationEnd);
	element.addEventListener('animationiteration', __animationEnd);

	requestIdleCallback(() => {
		element.setAttribute(attrPrefix('active'), true);
		element.setAttribute(attrPrefix('to'), true);
		element.removeAttribute(attrPrefix('from'));
	});
}

/**
 * Removes all messages sent by a given user from the overlay.
 * Called when a user is banned.
 *
 * @param {string} username - account whose messages to remove from the overlay
 */
export function removeAllMessagesFromUser(username) {
	const messagesFromUser = document.querySelectorAll(
		`[data-twitch-sender="${username}" i]:not([data-twitch-message-display-status="deleting"])`
	);
	messagesFromUser.forEach((message) => {
		const messageId = message.getAttribute('data-twitch-message');
		removeMessage(messageId);
	});
}

/**
 * Removes a specified message from the overlay's DOM, and adjust attributes for other messages in the same message group.
 *
 * @private
 * @param {Element} messageToDelete - list item containing a message to be removed from the overlay
 */
function _removeMessageFromDomAndShiftOthers(messageToDelete) {
	// If this message was the first in a cluster sent by one person, mark the next message in the group as the first
	const wasFirstInGroup = messageToDelete.getAttribute(
		'data-twitch-first-message-in-group'
	);
	const group = messageToDelete.getAttribute('data-twitch-message-group');
	const hasNextInGroup =
		messageToDelete.nextSibling &&
		messageToDelete.nextSibling.getAttribute('data-twitch-message-group') ===
			group;
	if (wasFirstInGroup && hasNextInGroup) {
		messageToDelete.nextSibling.setAttribute(
			'data-twitch-first-message-in-group',
			true
		);
	}

	// Remove the deleted message
	messageToDelete.remove();
}

/**
 * Removes a specified message from the overlay, respecting themes' transitions.
 *
 * @param {string} messageId - unique identifier of message getting deleted
 */
export function removeMessage(messageId) {
	const messageToDelete = document.querySelector(
		`[data-twitch-message="${messageId}"]:not([data-twitch-message-display-status="deleting"])`
	);

	// Message has already been deleted through another means, or is in the process of getting deleted
	if (!messageToDelete) return;

	// Apply style hook for themes' outbound transitions
	messageToDelete.setAttribute(
		'data-twitch-message-display-status',
		'deleting'
	);

	/**
	 * Callback to remove message from DOM if it still exists.
	 * Callback for addEventListener which cleans up after itself.
	 */
	function _callbackRemoveMessageFromDom() {
		let remainingMessageToDelete = document.querySelector(
			`[data-twitch-message="${messageId}"]`
		);
		if (remainingMessageToDelete) {
			_removeMessageFromDomAndShiftOthers(messageToDelete);
		}
	}

	createAnimationHandler(
		'delete',
		messageToDelete,
		_callbackRemoveMessageFromDom
	);
}
