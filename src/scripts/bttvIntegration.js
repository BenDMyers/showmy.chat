/**
 * @param {string} textContent the base text to search for keywords
 * @param {string} keyword the keyword that matches to an emote
 * @param {string} imageSource the image source url string of that emote
 * @param {string} id the source id of that emote
 * @returns {string} the base text modified with any matched keywords turned into html image tags
 */
function replaceKeywordWithEmoteImageString(textContent, keyword, imageSource, id){ 
    const argumentsExistAndAreStrings = areTruthyStrings(textContent, keyword, imageSource, id); 
    if (!argumentsExistAndAreStrings) {return null }
    const imageHtmlString = `<img alt="${keyword}" data-twitch-emote="${keyword}" data-twitch-emote-id="${id}" src="${imageSource}"></img>`;
    const words = textContent.split(' ');
    const modifiedTextContent = words.map(word => word === keyword ? imageHtmlString : word).join(' ');
    return modifiedTextContent;
}


function areTruthyStrings(keyword, imageSource, id)  { 
    let hasValidInputs = true;
    for (arg of arguments){ 
        if (!arg || typeof arg !== "string"){ 
            hasValidInputs = false;
        }
    }
    return hasValidInputs
}


async function getTwitchUserId(username, fetchFunction){ 
    if (!username || typeof username !== "string"){ 
        return null;
    }
    fetchFunction = fetchFunction || defaultFetch
    const apiBaseUrl = "https://streamraiders.tips/_functions/getTwitchProfileData/";
    const urlToQuery = apiBaseUrl + username;
    const twitchUserData = await fetchFunction(urlToQuery);
    return new Promise( resolve => { 
        resolve(twitchUserData.id)
    })
}


async function getBttvChannelEmoteDict(userId, fetchFunction){
    if ( !userId || typeof userId !== "string") {return null} 
    fetchFunction = fetchFunction || defaultFetch
    const apiBaseUrl = "https://api.betterttv.net/3/cached/users/twitch/"
    const urlToQuery = apiBaseUrl + userId;
    const bttvChannelData = await fetchFunction(urlToQuery);
    const emoteDict = convertBttvChannelDataToEmoteDict(bttvChannelData);
    return new Promise( resolve=> { 
        resolve(emoteDict);
    })
}


async function defaultFetch(url){ 
    const response = await fetch(url);
    const json = await response.json();
    return new Promise(resolve => { 
        resolve(json);
    })
}


function convertBttvChannelDataToEmoteDict(channelData){ 
    if (!channelData || typeof channelData !== "object") { return null };
    let emotesArray = []
    if (channelData.channelEmotes) { emotesArray.push(...channelData.channelEmotes) }
    if (channelData.sharedEmotes) { emotesArray.push(...channelData.sharedEmotes)}
    let emotesDict = {};
    for (emote of emotesArray){ 
        const emoteName = emote.code;
        emotesDict[emoteName] = emote.id;
    }
    return emotesDict
}
    

function getBttvImageUrl(bttvEmoteId){ 
    if (!bttvEmoteId || typeof bttvEmoteId !== "string"){ return null}
    return url = `https://cdn.betterttv.net/emote/${bttvEmoteId}/3x`
}


async function addGlobalEmotesToDict(dictObject,fetchFunction){ 
    if (!dictObject || typeof dictObject !== "object") { return null }
    fetchFunction = fetchFunction || defaultFetch
    const bttvUrl = "https://api.betterttv.net/3/cached/emotes/global";
    const response = await fetchFunction(bttvUrl);
    const emoteDict = convertBttvChannelDataToEmoteDict({"sharedEmotes":response})
    dictObject = {...dictObject,...emoteDict}
    return new Promise( resolve => { 
        resolve(dictObject);
    })
}


module.exports = { 
    replaceKeywordWithEmoteImageString, 
    getTwitchUserId,
    getBttvChannelEmoteDict,
    convertBttvChannelDataToEmoteDict,
    getBttvImageUrl,
    addGlobalEmotesToDict
}

