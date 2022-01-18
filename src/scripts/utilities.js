function removeAllMessagesFromUser(username) {
    Array.from(document.querySelectorAll('[data-twitch-message]')).forEach(messageNode => {
        const senderUsername = messageNode.querySelector('.twitch-chat-sender').textContent;
        if (senderUsername.toLowerCase() === username.toLowerCase()) {
            removeMessageFromDomAndShiftOthers(messageNode)
        }
    })
}



/**
 * @param messageToDelete
 */
function removeMessageFromDomAndShiftOthers(messageToDelete) {
    let wasFirstInGroup = messageToDelete.getAttribute(
        'data-twitch-first-message-in-group'
    );
    let group = messageToDelete.getAttribute('data-twitch-message-group');
    let hasNextInGroup =
        messageToDelete.nextSibling &&
        messageToDelete.nextSibling.getAttribute('data-twitch-message-group') ===
        group;
    if (wasFirstInGroup && hasNextInGroup) {
        messageToDelete.nextSibling.setAttribute(
            'data-twitch-first-message-in-group',
            true
        );
    }
    messageToDelete.remove();
}