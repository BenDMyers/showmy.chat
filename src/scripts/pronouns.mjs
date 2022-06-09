/** Map pronouns from Alejo's pronouns API to neatly formatted pronouns */
const FORMATTED_PRONOUNS = window.CONFIG.showPronouns
	? await initializeFormattedPronouns()
	: {};

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
 * Memoization for chatter's designated pronouns
 *
 * @type {Object<string, false | string>}
 */
const chatterPronouns = {};

/**
 *
 * @param {string} username chatter's username
 * @returns {false | string} chatter's pronouns, or false if unset
 */
export async function getPronouns(username) {
	const memoizedPronouns = chatterPronouns[username];
	if (memoizedPronouns !== undefined) {
		return memoizedPronouns;
	}

	const response = await fetch(
		`https://pronouns.alejo.io/api/users/${username}`
	);
	/** @type {{id: string, login: string, pronoun_id: string}[]} */
	const [pronounsSet] = (await response.json()) || [];

	if (pronounsSet) {
		const {pronoun_id} = pronounsSet;
		/** @type {string | false} */
		const formattedPronoun = FORMATTED_PRONOUNS[pronoun_id] || false;
		chatterPronouns[username] = formattedPronoun;
		return formattedPronoun;
	} else {
		chatterPronouns[username] = false;
		return false;
	}
}
