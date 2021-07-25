const fs = require('fs');

const list = fs
	.readdirSync(`${process.cwd()}/src/themes/`)
	.filter(stylesheet => stylesheet.endsWith('.css'))
	.map(stylesheet => stylesheet.replace('.css', ''));

const normalized = list.reduce(function(accumulated, current) {
	accumulated[current] = true;
	return accumulated;
}, {});

module.exports = {
	list,
	normalized
};