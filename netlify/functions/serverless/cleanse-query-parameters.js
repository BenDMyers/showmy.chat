const defaults = require('../../../src/_data/defaults');

/**
 * @type {Object<string, {validate: Validator, transform?: Transformer}>}
 */
const VALID_PARAMETERS = {
	DEMO: {
		validate: (value) => isBoolean(value) || value === 'static',
		transform: (value) => (isBoolean(value) ? toBoolean(value) : value),
	},
	clearMessageAfter: {
		validate: isPositiveInteger,
		transform: Number.parseInt,
	},
	disableAnimatedEmotes: {
		validate: isBoolean,
		transform: toBoolean,
	},
	hideMessagesFrom: {
		validate: isCommaSeparatedList,
		transform: (value) => toStringArray(value.toLowerCase()),
	},
	showCommands: {
		validate: (value) => isBoolean(value) || isCommaSeparatedList(value),
		transform: (value) =>
			isBoolean(value) ? toBoolean(value) : toStringArray(value),
	},
	showLatestMessages: {
		validate: isPositiveInteger,
		transform: Number.parseInt,
	},
	theme: {
		validate: isString,
	},
};

/**
 * Iterate over all provided query parameters and determine whether they're valid values,
 * and returns an object where invalid parameters are removed and other parameters are reformatted.
 *
 * @param {Object<string, string>} queryStringParameters all query string parameters provided to serverless function via the overlay URL
 * @returns {Object<string, any>} reformatted query parameters
 */
function cleanseQueryParameters(queryStringParameters) {
	// Preload configurations with OPTIONAL defaults
	const {channel, ...queryParameters} = defaults;
	// Iterate over provided query parameters
	for (const param in queryStringParameters) {
		// If this is a valid parameter name at all…
		if (VALID_PARAMETERS[param]) {
			const paramValue = queryStringParameters[param];
			const {validate, transform} = VALID_PARAMETERS[param];
			// And if it meets our requirements for that…
			if (validate(paramValue)) {
				// Keep the parameter and (if necessary) transform its value
				const newValue = transform ? transform(paramValue) : paramValue;
				queryParameters[param] = newValue;
			} else {
				console.error(
					`"${paramValue}" is not a valid value for the "${param}" configuration.`
				);
			}
		} else {
			console.error(
				`"${param}" is not a valid configuration for a showmy.chat overlay`
			);
		}
	}
	return queryParameters;
}

module.exports = cleanseQueryParameters;

// VALIDATORS

/**
 * @callback Validator function used to determine whether a specific query parameter should be kept or thrown out
 * @param {string} queryValue value of a single query parameter
 * @returns {boolean} true if query parameter should be kept (value possibly transformed) or totally thrown out
 */

/** @type {Validator} */
function isBoolean(value) {
	return ['true', 'false'].includes(value);
}
/** @type {Validator} */
function isCommaSeparatedList(value) {
	const COMMA_SEPARATED = /^[\w-]+(,[\w-]+)*$/;
	return COMMA_SEPARATED.test(value);
}
/** @type {Validator} */
function isString(value) {
	return typeof value === 'string';
}
/** @type {Validator} */
function isPositiveInteger(value) {
	const num = Number(value);
	return Number.isInteger(num) && num > 0;
}

// TRANSFORMERS FOR QUERY PARAMETER VALUES

/**
 * @callback Transformer function used to transform a query parameter's value into a more usable format
 * @param {string} queryValue value of a single query parameter
 * @returns {any} query parameter's value transformed into a more usable format
 */

/**
 * @type {Transformer}
 * @returns {string[]} array of substrings split by the comma delimiter
 */
function toStringArray(value) {
	return value.split(',');
}

/**
 * @type {Transformer}
 * @returns {boolean} boolean version of original 'true' or 'false' string
 */
function toBoolean(value) {
	return value === 'true' ? true : false;
}
