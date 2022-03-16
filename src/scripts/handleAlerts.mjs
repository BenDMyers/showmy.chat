/* global ComfyJS */
// we use the skypack CDN here because this isn't packaged correctly
//  for the browser based ESM
import {main, createQueue, sleep} from 'https://cdn.skypack.dev/effection';

const alertbox = document.querySelector('[data-twitch-alert]');

const watchedChannels = alertbox.getAttribute('data-twitch-alert');

/**
 *
 */
async function init() {
	return main(function* () {
		let messageBacklog = createQueue();

		/**
		 * @param {object} handleAlert
		 * @param {string} handleAlert.user
		 * @param {string} handleAlert.message
		 * @param handleAlert.extra
		 * @param handleAlert.messageBacklog
		 */
		function handleAlert({user, message, extra}) {
			// Assemble alert node
			const newAlert = document.createElement('div');
			newAlert.innerHTML = message;
			newAlert.classList.add('twitch-chat-message');
			newAlert.setAttribute('data-twitch-message', extra.id);
			newAlert.setAttribute('data-twitch-sender', user);

			messageBacklog.send(newAlert);
		}

		ComfyJS.onRaid = function (user, viewers, extra = {}) {
			const message = `${user} is raiding with ${viewers} viewers!`;
			return handleAlert({user, message, extra});
		};

		ComfyJS.onCheer = function (user, message, bits, flags, extra) {
			const composedMessage = `${user} cheered with ${bits}! ${message}`;
			return handleAlert({
				user,
				message: composedMessage,
				extra,
			});
		};

		ComfyJS.onSub = function (user, message, subTierInfo, extra) {
			const composedMessage = `${user} subscribed at ${subTierInfo}! ${message}`;
			return handleAlert({
				user,
				message: composedMessage,
				extra,
			});
		};

		ComfyJS.onResub = function (
			user,
			message,
			streamMonths,
			cumulativeMonths,
			subTierInfo,
			extra
		) {
			const composedMessage = `${user} continued their subscription for ${cumulativeMonths}! ${message}`;
			return handleAlert({user, message: composedMessage, extra});
		};

		ComfyJS.onSubGift = function (
			gifterUser,
			streakMonths,
			recipientUser,
			senderCount,
			subTierInfo,
			extra
		) {
			const composedMessage = `${gifterUser} gifted ${recipientUser} a subscription!`;
			return handleAlert({user: gifterUser, message: composedMessage, extra});
		};

		ComfyJS.onSubMysteryGift = function (
			gifterUser,
			numbOfSubs,
			senderCount,
			subTierInfo,
			extra
		) {
			const composedMessage = `${gifterUser} gifted ${numbOfSubs} ${
				numbOfSubs > 1 ? 'subscriptions' : 'a subscription'
			}!`;
			return handleAlert({user: gifterUser, message: composedMessage, extra});
		};

		ComfyJS.onGiftSubContinue = function (user, sender, extra) {
			const message = `${user} is continuing their subscription!`;
			return handleAlert({user, message, extra});
		};

		ComfyJS.Init(null, null, watchedChannels.split(' '));

		yield messageBacklog.forEach(function* (nextAlert) {
			alertbox.open = true;
			alertbox.append(nextAlert);
			yield sleep(4000);
			alertbox.open = false;
			alertbox.replaceChildren();
		});
	});
}

init();
