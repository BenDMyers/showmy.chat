/**
 * @param {string} textContent the base text to search for keywords
 * @param {string} keyword the keyword that matches to an emote
 * @param {string} imageSource the image source url string of that emote
 * @param {string} id the BTTV id of that emote
 * @returns {string} the base text modified with any matched keywords turned into html image tags with that emote as src
 */
export function replaceKeywordWithBttvEmoteImage(
	textContent,
	keyword,
	imageSource,
	id
) {
	const argumentsExistAndAreStrings = areAllTruthyStrings([
		textContent,
		keyword,
		imageSource,
		id,
	]);
	if (!argumentsExistAndAreStrings) {
		return null;
	}
	const imageHtmlString = `<img alt="${keyword}" data-twitch-emote="${keyword}" data-twitch-emote-id="${id}" data-twitch-emote-source="bttv" src="${imageSource}"></img>`;
	const words = textContent.split(' ');
	const modifiedTextContent = words
		.map((word) => (word === keyword ? imageHtmlString : word))
		.join(' ');
	return modifiedTextContent;
}

/**
 * @param {Array} arrayOfInputs values to be tested
 * @returns {boolean} true if all inputs provided are both truthy and strings, false if not
 */
export function areAllTruthyStrings(arrayOfInputs) {
	let areTruthyStrings = true;
	if (arrayOfInputs.length === 0) {
		areTruthyStrings = false;
	}
	for (const input of arrayOfInputs) {
		if (!input || typeof input !== 'string') {
			areTruthyStrings = false;
		}
	}
	return areTruthyStrings;
}

/**
 * @param {string} username Twitch username, case insensitive
 * @param {Function} [fetchFunction] Function to use to fetch from an endpoint. Defaults to browser's native fetch.
 * @returns {string} Twitch user ID
 */
export async function getTwitchUserId(username, fetchFunction) {
	if (!username || typeof username !== 'string') {
		return null;
	}
	fetchFunction = fetchFunction || defaultFetch;
	const apiBaseUrl =
		'https://streamraiders.tips/_functions/getTwitchProfileData/';
	const urlToQuery = apiBaseUrl + username;

	try {
		const twitchUserData = await fetchFunction(urlToQuery);
		return new Promise((resolve) => {
			resolve(twitchUserData.id);
		});
	} catch (err) {
		console.log(err);
	}
}

/**
 * @param {string} userId Twitch's user ID
 * @param {Function} [fetchFunction] a specific fetch function that returns a promise
 * that resolves to a json of the fetched url resource.
 * @returns {Object<string, string>} key is the friendly emote name, value is the BTTV emote id
 */
export async function getBttvChannelEmoteDict(userId, fetchFunction) {
	if (!userId || typeof userId !== 'string') {
		return null;
	}
	fetchFunction = fetchFunction || defaultFetch;
	const apiBaseUrl = 'https://api.betterttv.net/3/cached/users/twitch/';
	const urlToQuery = apiBaseUrl + userId;
	const bttvChannelData = await fetchFunction(urlToQuery);
	const emoteDict = convertBttvChannelDataToEmoteDict(bttvChannelData);
	return new Promise((resolve) => {
		resolve(emoteDict);
	});
}

/**
 * @param {string} url url to retrieve json from
 * @returns {object} json data received from fetch
 */
export async function defaultFetch(url) {
	// TODO: properly fix, this is a temporary stopgap to make local development work
	if (window.location.hostname == 'localhost') {
		return new Promise((resolve) => {
			resolve({});
		});
	}
	const response = await fetch(url);
	const json = await response.json();
	return new Promise((resolve) => {
		resolve(json);
	});
}

/**
 * @param {{
 *    id: string,
 *    avatar: string,
 *    bots: string[],
 *    channelEmotes?: {code: string, id: string, imageType: string}[],
 *    sharedEmotes?: {code: string, id: string, imageType: string}[]
 * }} channelData data structure provided by BTTV's api for channel queries.
 * If user not found, will receive {"message":"user not found"}
 * @returns {Object<string, string>} key is the friendly emote name, value is the BTTV emote id
 */
export function convertBttvChannelDataToEmoteDict(channelData) {
	if (!channelData || typeof channelData !== 'object') {
		return null;
	}

	let emotesDict = {};
	if (channelData.channelEmotes) {
		channelData.channelEmotes.forEach(
			(emote) => (emotesDict[emote.code] = emote.id)
		);
	}
	if (channelData.sharedEmotes) {
		channelData.sharedEmotes.forEach(
			(emote) => (emotesDict[emote.code] = emote.id)
		);
	}
	return emotesDict;
}

/**
 * @param {string} bttvEmoteId  BTTV's uid for the emote
 * @returns {string} url for the emote's image source
 */
export function getBttvImageUrl(bttvEmoteId) {
	if (!bttvEmoteId || typeof bttvEmoteId !== 'string') {
		return null;
	}
	return `https://cdn.betterttv.net/emote/${bttvEmoteId}/3x`;
}

/**
 * @param {Object<string, string>} dictObject  key is friendly emote name, value is the BTTV emote id
 * @param {Function} [fetchFunction] Function to use to fetch from an endpoint. Defaults to browser's native fetch.
 * @returns {Object<string, string>} same as input - key is friendly name, value is id
 */
export async function addGlobalBttvEmotesToDict(dictObject, fetchFunction) {
	if (!dictObject || typeof dictObject !== 'object') {
		return null;
	}
	fetchFunction = fetchFunction || defaultFetch;
	const bttvUrl = 'https://api.betterttv.net/3/cached/emotes/global';
	const response = await fetchFunction(bttvUrl);
	const emoteDict = convertBttvChannelDataToEmoteDict({
		sharedEmotes: response,
	});
	dictObject = {...dictObject, ...emoteDict};
	return new Promise((resolve) => {
		resolve(dictObject);
	});
}
