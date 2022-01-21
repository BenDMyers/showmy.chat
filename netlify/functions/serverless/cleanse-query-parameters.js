const ENUMS = {
	DEMO: {
		true: true,
		false: false,
		static: 'static',
	},
};

/**
 * @type {object<string, {validate: Validator, transform?: Transformer}>}
 */
const VALID_PARAMETERS = {
	DEMO: {
		validate: oneOf(...Object.keys(ENUMS['DEMO'])),
		transform: getVariantValue('DEMO'),
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
 * @param {object<string, string>} queryStringParameters
 * @returns {object<string, any>} reformatted query parameters
 */
function cleanseQueryParameters(queryStringParameters) {
	// Preload configurations with OPTIONAL defaults
	const queryParameters = {
		showLatestMessages: 100,
		theme: 'default',
	};

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
/** @type {Validator} */
function oneOf(...args) {
	return (value) => args.includes(value);
}

// TRANSFORMERS FOR QUERY PARAMETER VALUES

/**
 * @param {string} enumName - name of the enum for this query parameter
 * @returns {Transformer} - function that turns the passed value for the query parameter into a value for the corresponding enum
 */
function getVariantValue(enumName) {
	return (variant) => ENUMS[enumName][variant];
}

/**
 * @callback Transformer function used to transform a query parameter's value into a more usable format
 * @param {string} queryValue value of a single query parameter
 * @returns {any} query parameter's value transformed into a more usable format
 */

/**
 * @type {Transformer}
 * @returns {string[]}
 */
function toStringArray(value) {
	return value.split(',');
}

/**
 * @type {Transformer}
 * @returns {boolean}
 */
function toBoolean(value) {
	return value === 'true' ? true : false;
}
