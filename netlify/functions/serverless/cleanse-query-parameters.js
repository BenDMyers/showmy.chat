/**
 * @type {Object<string, {validate: Validator, transform?: Transformer}}
 */
const VALID_PARAMETERS = {
	DEMO: {
		validate: isBoolean,
		transform: toBoolean
	},
	showLatestMessages: {
		validate: isPositiveInteger,
		transform: Number.parseInt
	},
	theme: {
		validate: isString
	}
};

/**
 * Iterate over all provided query parameters and determine whether they're valid values,
 * and returns an object where invalid parameters are removed and other parameters are reformatted.
 * @param {Object<string, string>} queryStringParameters
 * @return {Object<string, any>} reformatted query parameters
 */
function cleanseQueryParameters(queryStringParameters) {
	const queryParameters = {};
	for (const param in queryStringParameters) {
		if (VALID_PARAMETERS[param]) {
			const paramValue = queryStringParameters[param];
			const {validate, transform} = VALID_PARAMETERS[param];
			if (validate(paramValue)) {
				const newValue = transform ? transform(paramValue) : paramValue;
				queryParameters[param] = newValue;
			} else {
				console.error(`"${paramValue}" is not a valid value for the "${param}" configuration.`);
			}
		} else {
			console.error(`"${param}" is not a valid configuration for a showmy.chat overlay`);
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

/** @type {Transformer} */
function toBoolean(value) {
	return value === 'true' ? true : false;
}