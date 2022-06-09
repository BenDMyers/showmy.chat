/** Map pronouns from Alejo's pronouns API to neatly formatted pronouns */
const FORMATTED_PRONOUNS = {
	aeaer: 'Ae/Aer',
	any: 'Any',
	eem: 'E/Em',
	faefaer: 'Fae/Faer',
	hehim: 'He/Him',
	heshe: 'He/She',
	hethem: 'He/They',
	itits: 'It/Its',
	other: 'Other',
	perper: 'Per/Per',
	sheher: 'She/Her',
	shethem: 'She/They',
	theythem: 'They/Them',
	vever: 'Ve/Ver',
	xexem: 'Xe/Xem',
	ziehier: 'Zie/Hir',
};

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
export async function getChatterPronouns(username) {
	const memoizedPronouns = chatterPronouns[username];
	if (memoizedPronouns !== undefined) {
		return memoizedPronouns;
	}

	const response = await fetch(
		`https://pronouns.alejo.io/api/users/${username}`
	);
	/** @type {{id: string, login: string, pronoun_id: string}[]} */
	const [pronounsSet] = await response.json();

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
