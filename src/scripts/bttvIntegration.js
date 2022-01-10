/**
 * @param {string} textContent the base text to search for keywords
 * @param {string} keyword the keyword that matches to an emote
 * @param {string} imageSource the image source url string of that emote
 * @param {string} id the BTTV id of that emote
 * @returns {string} the base text modified with any matched keywords turned into html image tags
 */
function replaceKeywordWithBttvEmoteImageString(textContent, keyword, imageSource, id){ 
    const argumentsExistAndAreStrings = areAllTruthyStrings([textContent,keyword,imageSource,id]); 
    if (!argumentsExistAndAreStrings) { return null }
    const imageHtmlString = 
    `<img alt="${keyword}" data-twitch-emote="${keyword}" data-twitch-emote-id="${id}" data-twitch-emote-source="bttv" src="${imageSource}"></img>`;
    const words = textContent.split(' ');
    const modifiedTextContent = words.map(word => word === keyword ? imageHtmlString : word).join(' ');
    return modifiedTextContent;
}


/**
 * @param {Array} arrayOfInputs values to be tested 
 * @returns {Boolean} true if all inputs provided are both truthy and strings, false if not
 */
function areAllTruthyStrings(arrayOfInputs)  { 
    let areTruthyStrings = true;
    if (arrayOfInputs.length === 0){ areTruthyStrings = false }
    for (input of arrayOfInputs){ 
        if (!input || typeof input !== "string"){ areTruthyStrings = false }
    }
    return areTruthyStrings
}


/**
 * @param {string} username twitch username, case insensitive
 * @returns {string} twitch user id
 */
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


/**
 * @param {string} userId twitch's user ID 
 * @param {Function} fetchFunction optional - a specific fetch function that returns a promise
 * that resolves to a json of the fetch data
 * @returns {Object} key is the friendly emote name, value is the BTTV emote id
 */
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


/**
 * @param {string} url url to retrieve json from
 * @returns {Object} json data received from fetch
 */
async function defaultFetch(url){ 
    const response = await fetch(url);
    const json = await response.json();
    return new Promise(resolve => { 
        resolve(json);
    })
}


/**
 * @param {Object} channelData  data structure provided by BTTV's api for channel queries
 * @returns {Object} key is the friendly emote name, value is the BTTV emote id
 */
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
    

/**
 * @param {string} bttvEmoteId  BTTV's uid for the emote
 * @returns {string} url for the emote's image source
 */
function getBttvImageUrl(bttvEmoteId){ 
    if (!bttvEmoteId || typeof bttvEmoteId !== "string"){ return null}
    return url = `https://cdn.betterttv.net/emote/${bttvEmoteId}/3x`
}



/**
 * @param {Object} dictObject  key is friendly emote name, value is the BTTV emote id
 * @returns {Object} same as input - key is friendlyh name, value is id
 */
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
    replaceKeywordWithBttvEmoteImageString, 
    getTwitchUserId,
    getBttvChannelEmoteDict,
    convertBttvChannelDataToEmoteDict,
    getBttvImageUrl,
    addGlobalEmotesToDict
}

