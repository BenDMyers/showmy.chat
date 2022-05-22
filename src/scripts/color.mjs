const HEXADECIMAL = 16;
const LIGHTNESS_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05; // see https://stackoverflow.com/a/3943023

/**
 * Converts a hex code into {r, g, b}, where r, g, and b are 0-255.
 *
 * @param {string} hexCode pound sign followed by six hexadecimal digits
 * @returns {{r: number, g: number, b: number}} red, green, and blue components normalized to the 0-255 range
 */
export function hexCodeToRgb(hexCode) {
	const [_octothorpe, red1, red2, green1, green2, blue1, blue2] =
		hexCode.split('');
	const red = red1 + red2;
	const green = green1 + green2;
	const blue = blue1 + blue2;

	return {
		r: parseInt(red, HEXADECIMAL),
		g: parseInt(green, HEXADECIMAL),
		b: parseInt(blue, HEXADECIMAL),
	};
}

/**
 * Converts a hex code into {r, g, b}, where r, g, and b are normalized to 0-1.
 *
 * @param {string} hexCode pound sign followed by six hexadecimal digits
 * @returns {{r: number, g: number, b: number}} red, green, and blue components normalized to the 0-1 range
 */
function hexCodeToSrgb(hexCode) {
	const {r, g, b} = hexCodeToRgb(hexCode);
	return {
		r: r / 255,
		g: g / 255,
		b: b / 255,
	};
}

/**
 * Converts a hex code into {h, s, l}
 *
 * @see https://css-tricks.com/converting-color-spaces-in-javascript/#aa-rgb-to-hsl
 * @param {string} hexCode pound sign followed by six hexadecimal digits
 * @returns {{h: number, s: number, l: number}} hue, saturation, and lightness components
 */
export function hexCodeToHsl(hexCode) {
	// Red, green, and blue components normalized to 0-1 range.
	const {r, g, b} = hexCodeToSrgb(hexCode);

	const largestChannel = Math.max(r, g, b);
	const smallestChannel = Math.min(r, g, b);
	const delta = largestChannel - smallestChannel;
	const isGray = delta === 0;

	let hueFloat = 0;

	if (isGray) {
		hueFloat = 0;
	} else if (r === largestChannel) {
		hueFloat = (g - b) / delta;
	} else if (g === largestChannel) {
		hueFloat = 2 + (b - r) / delta;
	} else {
		// b === largestChannel
		hueFloat = 4 + (r - g) / delta;
	}

	let hueAngle = Math.round(hueFloat * 60);
	let normalizedHueAngle = (hueAngle + 360) % 360;

	let lightness = (largestChannel + smallestChannel) / 2;
	let saturation = isGray ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

	return {
		h: normalizedHueAngle,
		s: saturation,
		l: lightness,
	};
}

/**
 * Gets the relative luminance of a given color
 *
 * @param {{r: number, g: number, b: number}} srgbColor color provided in sRGB (R, G, B values normalized to the range 0-1)
 * @returns {number} relative luminance
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * @see https://stackoverflow.com/a/3943023
 */
function getLuminance(srgbColor) {
	const {r, g, b} = srgbColor;
	const redLuminance =
		r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
	const greenLuminance =
		g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
	const blueLuminance =
		b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

	const luminance =
		0.2126 * redLuminance + 0.7152 * greenLuminance + 0.0722 * blueLuminance;
	return luminance;
}

/**
 * @param {string} hexCode color defined as a hex code (strictly, one pound sign followed by six hexadecimal digits)
 * @returns {'light'|'dark'} `light` if color is lighter than given threshold, `dark` otherwise
 */
export function isLightOrDark(hexCode) {
	const sRGB = hexCodeToSrgb(hexCode);
	const luminance = getLuminance(sRGB);
	return luminance > LIGHTNESS_THRESHOLD ? 'light' : 'dark';
}
