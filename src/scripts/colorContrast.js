const HEXADECIMAL = 16;
const LIGHTNESS_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05; // see https://stackoverflow.com/a/3943023

/**
 * Converts a hex code into {r, g, b}
 * @param {string} hexCode pound sign followed by six hexadecimal digits
 * @returns {{r: number, g: number, b: number}} red, green, and blue components normalized to the 0-1 range
 */
function hexCodeToSrgb(hexCode) {
	const [__octothorpe, red1, red2, green1, green2, blue1, blue2] = hexCode.split('');
	const red = red1 + red2;
	const green = green1 + green2;
	const blue = blue1 + blue2;

	return {
		r: parseInt(red, HEXADECIMAL) / 255,
		g: parseInt(green, HEXADECIMAL) / 255,
		b: parseInt(blue, HEXADECIMAL) / 255
	};
}

/**
 * Gets the relative luminance of a given color
 * @param {{r: number, g: number, b: number}} color color provided in sRGB (R, G, B values normalized to the range 0-1)
 * @returns {number} relative luminance
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * @see https://stackoverflow.com/a/3943023
 */
function getLuminance(color) {
	const {r, g, b} = color;
	const redLuminance = (r <= 0.03928) ?
		r / 12.92 :
		Math.pow((r + 0.055) / 1.055, 2.4);
	const greenLuminance = (g <= 0.03928) ?
		g / 12.92 :
		Math.pow((g + 0.055) / 1.055, 2.4);
	const blueLuminance = (b <= 0.03928) ?
		b / 12.92 :
		Math.pow((b + 0.055) / 1.055, 2.4);

	const luminance = (0.2126 * redLuminance) + (0.7152 * greenLuminance) + (0.0722 * blueLuminance);
	return luminance;
}

/**
 * @param {string} hexCode color defined as a hex code (strictly, one pound sign followed by six hexadecimal digits)
 * @returns {'light'|'dark'}
 */
export function isLightOrDark(hexCode) {
	const sRGB = hexCodeToSrgb(hexCode);
	const luminance = getLuminance(sRGB);
	return luminance > LIGHTNESS_THRESHOLD ? 'light' : 'dark';
}