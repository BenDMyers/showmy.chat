const fs = require('fs');
const path = require('path');

const themesDirectory = path.join(__dirname, '..', 'themes');

const list = fs
	.readdirSync(themesDirectory)
	.filter((stylesheet) => stylesheet.endsWith('.css'))
	.map((stylesheet) => stylesheet.replace('.css', ''))
	.sort();

const normalized = list.reduce(function (accumulated, current) {
	accumulated[current] = true;
	return accumulated;
}, {});

module.exports = {
	list,
	normalized,
};
