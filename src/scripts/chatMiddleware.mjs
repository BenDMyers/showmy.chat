/**
 * @callback OnChatMiddleware
 * @param {{user: string, messageContents: string, flags: object, extra: object}} messageDetails provided information about the chat message
 * @param {Element} [messageElement] HTML node for the provided message
 */

const middleware = [];

/**
 * Add a given middleware to the list of all middleware applied for chat messages
 *
 * @param {OnChatMiddleware} newMiddleware middleware function to be called with every new chat message
 * @returns {Function} callback to remove this middleware from the list
 */
export function addChatMiddleware(newMiddleware) {
	middleware.push(newMiddleware);
	return function () {
		const indexOfMiddleware = middleware.indexOf(newMiddleware);
		if (indexOfMiddleware >= 0) {
			middleware.splice(indexOfMiddleware, 1);
			return true;
		} else {
			return false;
		}
	};
}

/**
 * @param {{user: string, messageContents: string, flags: object, extra: object}} messageDetails provided information about the chat message
 * @param {Element} [messageElement] HTML node for the provided message
 */
export function applyChatMiddleware(messageDetails, messageElement) {
	middleware.forEach((m) => m(messageDetails, messageElement));
}
