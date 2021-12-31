module.exports = {
	eleventyComputed: {
		permalink: (data) => {
			const {filePathStem} = data.page;
			return filePathStem
				.replace('/pages', '')
				.replace('/en', '')
				.replace('/index', '')
				+ '/';
		},
		boop: (...x) => console.log(...x)
	}
};