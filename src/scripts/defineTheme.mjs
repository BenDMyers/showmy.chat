/**
 * @typedef {object} UrlOption
 * @property {string} name - Name shown to user
 * @property {string} paramName - name used in query string
 * @property {string} [customProperty=paramName] - the custom property name that will be defined (exclude initial `--`)
 * @property {'color'|'number'} type - the type of input you would like to use
 * @property {string|number} [default] - the default value
 */

/**
 * @typedef {object} ThemeOptions
 * @property {string} [name] - Our custom theme name
 * @property {string} [description] - A short blurb to describe your theme
 * @property {UrlOption[]} [options] - config for url options
 */

/**
 * @callback ThemeOptionsCallback
 * @returns {ThemeOptions}
 */

/**
 *
 * @param {ThemeOptions} options - our options object
 * @returns {ThemeOptionsCallback} a function that will return our options
 */
export function defineTheme(options) {
	return () => options;
}

//export async function
