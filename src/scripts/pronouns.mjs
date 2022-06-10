const MINUTES = 1000 * 60;
const CACHE_TIME_TO_LIVE = 15 * MINUTES;

/** Map pronouns from Alejo's pronouns API to neatly formatted pronouns */
const FORMATTED_PRONOUNS = window.CONFIG.showPronouns
	? await initializeFormattedPronouns()
	: {};

/**
 * Memoization for chatter's designated pronouns
 *
 * @type {Object<string, {lastChecked: number, pronouns: false | string}>}
 */
const chatterPronouns = {};

/**
 * Retrieves list of formatted pronoun strings from Alejo's pronouns API
 *
 * @returns map of pronouns' API IDs to their neatly formatted versions
 */
async function initializeFormattedPronouns() {
	/** @type {Object<string, string>} */
	const pronounsMap = {};

	const response = await fetch('https://pronouns.alejo.io/api/pronouns');
	/** @type {{name: string, display: string}[]} */
	const pronounsList = (await response.json()) || [];

	for (let pronoun of pronounsList) {
		const {name, display} = pronoun;
		pronounsMap[name] = display;
	}

	return pronounsMap;
}

/**
 * Determine whether a given username was fetched recently enough that we should leverage their cache.
 *
 * @param {string} username chatter's username
 * @returns {boolean} `true` if the cache should NOT be revalidated
 */
function withinCacheTimeToLive(username) {
	const cache = chatterPronouns[username];
	if (!cache) {
		return false;
	}

	const revalidateTime = cache.lastChecked + CACHE_TIME_TO_LIVE;
	return Date.now() < revalidateTime;
}

/**
 * Gets the user's specified pronouns, leveraging the cache if possible.
 *
 * @param {string} username chatter's username
 * @returns {false | string} chatter's pronouns, or false if unset
 */
export async function getPronouns(username) {
	if (withinCacheTimeToLive(username)) {
		const {pronouns} = chatterPronouns[username];
		return pronouns;
	}

	const response = await fetch(
		`https://pronouns.alejo.io/api/users/${username}`,
		{cache: 'no-cache'}
	);
	/** @type {{id: string, login: string, pronoun_id: string}[]} */
	const [pronounsSet] = (await response.json()) || [];

	if (pronounsSet) {
		const {pronoun_id} = pronounsSet;
		/** @type {string | false} */
		const formattedPronoun = FORMATTED_PRONOUNS[pronoun_id] || false;
		chatterPronouns[username] = {
			lastChecked: Date.now(),
			pronouns: formattedPronoun,
		};
		return formattedPronoun;
	} else {
		chatterPronouns[username] = {
			lastChecked: Date.now(),
			pronouns: false,
		};
		return false;
	}
}
