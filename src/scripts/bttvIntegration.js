//`<img alt="${emoteName}" data-twitch-emote="${emoteName}" data-twitch-emote-id="${emoteId}" src="${emoteSrc}">`

function replaceKeywordWithEmoteImageString(textContent, keyword, imageSource, id){ 
    if (!textContent, !keyword, !imageSource, !id) { return null };
    const imageHtmlString = `<img alt="${keyword}" data-twitch-emote="${keyword}" data-twitch-emote-id="${id}" src="${imageSource}"></img>`;
    const words = textContent.split(' ');
    return words.map(word => word === keyword ? imageHtmlString : word).join(' ');
}

module.exports = { replaceKeywordWithEmoteImageString }