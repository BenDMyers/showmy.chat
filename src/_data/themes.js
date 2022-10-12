const fs = require('fs');
const path = require('path');

const themesDirectory = path.resolve(__dirname, '..', 'themes');

const themesFolderListing = fs.readdirSync(themesDirectory);

const list = themesFolderListing
	.filter((stylesheet) => stylesheet.endsWith('.css'))
	.map((stylesheet) => stylesheet.replace('.css', ''))
	.sort();

const scripts = themesFolderListing
	.filter((script) => script.endsWith('.mjs'))
	.map((script) => script.replace('.mjs', ''));
const details = scripts.reduce(async (accumulated, current) => {
	try {
		const myScript = await import(
			'file:///' + path.join(themesDirectory, current + '.mjs')
		);
		if (myScript.default instanceof Function)
			accumulated[current] = myScript.default();
	} catch (e) {
		console.log(e);
	}
	return accumulated;
}, {});

const normalized = list.reduce(function (accumulated, current) {
	accumulated[current] = true;
	return accumulated;
}, {});

module.exports = {
	list,
	normalized,
	scripts,
	details,
};
