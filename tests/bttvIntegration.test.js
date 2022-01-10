const {
    replaceKeywordWithEmoteImageString, 
    getTwitchUserId,
    getBttvChannelEmoteDict,
    convertBttvChannelDataToEmoteDict,
    getBttvImageUrl,
    addGlobalEmotesToDict
} = require('../src/scripts/bttvIntegration.js');
const axios = require('axios');

async function fetchFunction(url) {
    const response = await axios(url)
    return new Promise(resolve => {
        resolve(response.data)
    })
}



describe("BTTV integration -> replaceKeywordWithEmoteImageString", () => {
    test('missing text content throws exception', () => {
        expect(() => {
            replaceKeywordWithEmoteImageString()
        }).toThrow()
    })

    test('missing keyword, image source, or id, returns untouched text content', () => {
        expect(replaceKeywordWithEmoteImageString("Hi, I'm text content!")).toBe("Hi, I'm text content!");
        expect(replaceKeywordWithEmoteImageString("Hi, I'm text content!", "blargh")).toBe("Hi, I'm text content!")
        expect(replaceKeywordWithEmoteImageString("Hi, I'm text content!", "blargh", "blargh.png")).toBe("Hi, I'm text content!")
    })

    test('if text content invalid, throws exception', () => {
        expect(() => {
            replaceKeywordWithEmoteImageString({ "i'm": "an", "object": "silly" })
        }).toThrow()
    })


    test('if keyword, image source, or id are invalid, returns text content', () => {
        expect(
            replaceKeywordWithEmoteImageString(
                "Hi, I'm text content!",
                ["array", "of", "strings"],
                1387130913509150,
                { "id": "13891309" }
            )
        ).toBe("Hi, I'm text content!")
    })

    test('replaces basic string with matching value properly', () => {
        expect(replaceKeywordWithEmoteImageString("hello hi hell hellp phello", "hello", "getrekt.png", "69420"))
            .toBe('<img alt="hello" data-twitch-emote="hello" data-twitch-emote-id="69420" src="getrekt.png"></img> hi hell hellp phello')
    })


})

describe("BTTV Integration -> getTwitchUserId", () => {
    test('no argument given for username return null', async () => {
        await expect(getTwitchUserId()).resolves.toBe(null);
    })

    test('if username argument is not a string, return null', async () => {
        await expect(getTwitchUserId(13851958124)).resolves.toBe(null)
    })

    test('with valid input, returns a string', async () => {
        const result = await getTwitchUserId("frostyypaws", fetchFunction)
        expect(typeof result).toBe("string")
    })

    test('with valid input of a user with known id, returns correct id', async () => {
        const result = await getTwitchUserId("frostyypaws", fetchFunction)
        expect(result).toBe("66154494")
    })
})

describe("BTTV Integration -> getBttvChannelEmoteDict", () => {

    const sampleBttvChannelDataNoShared = {
        "id": "5d4a1e8f9728020aca0db02a",
        "bots": [],
        "avatar": "https://static-cdn.jtvnw.net/jtv_user_pictures/61f3133d-6e62-4b1a-af40-7ce3d0c9bb3b-profile_image-300x300.png",
        "channelEmotes": [{ "id": "5d4fc81baff6f30ad530cd0d", "code": "megaF", "imageType": "png", "userId": "5d4a1e8f9728020aca0db02a" }, { "id": "6057e66961e7e44b5aa4f050", "code": "dealWithIt", "imageType": "png", "userId": "5d4a1e8f9728020aca0db02a" }, { "id": "6057e6eb61e7e44b5aa4f058", "code": "elmoBuff", "imageType": "png", "userId": "5d4a1e8f9728020aca0db02a" }]
    }

    const sampleBttvChannelDataNoChannel = {
        "id": "5d4a1e8f9728020aca0db02a",
        "bots": [],
        "avatar": "https://static-cdn.jtvnw.net/jtv_user_pictures/61f3133d-6e62-4b1a-af40-7ce3d0c9bb3b-profile_image-300x300.png",
        "sharedEmotes": [{ "id": "5d4fc81baff6f30ad530cd0d", "code": "megaF", "imageType": "png", "userId": "5d4a1e8f9728020aca0db02a" }, { "id": "6057e66961e7e44b5aa4f050", "code": "dealWithIt", "imageType": "png", "userId": "5d4a1e8f9728020aca0db02a" }, { "id": "6057e6eb61e7e44b5aa4f058", "code": "elmoBuff", "imageType": "png", "userId": "5d4a1e8f9728020aca0db02a" }]
    }

    const sampleBttvUserNotFound = { "message": "user not found" }

    test('if no channel id provided returns null', async () => {
        const result = await getBttvChannelEmoteDict();
        expect(result).toBe(null);
    })

    test('if channel id provided is not string, returns null', async () => {
        const result = await getBttvChannelEmoteDict({ "id": "39031091" });
        expect(result).toBe(null);
    })

    test('with valid input, expect response to be a object', async () => {
        const result = await getBttvChannelEmoteDict("66154494", fetchFunction);
        expect(typeof result).toBe("object");
    })

    test('with valid input with known response, expect response key:value pairs to be correct', async () => {
        const result = await getBttvChannelEmoteDict("66154494", fetchFunction);
        expect(result.pepinoSip).toBe("607b80f339b5010444d015f8");
        expect(result.peepoLeave).toBe("5d9be805d2458468c1f4dbb3")
    })
})

describe("BTTV Integration -> convertBttvChannelDataToEmoteDict", () => {
    test('no channel data returns null', () => {
        expect(convertBttvChannelDataToEmoteDict()).toBe(null);
    })

    test('channel data not object returns null', () => {
        expect(convertBttvChannelDataToEmoteDict("derpderp")).toBe(null)
    })

    test('with valid input that doesnt have shared emotes, returns proper data structure', () => {
        expect(convertBttvChannelDataToEmoteDict(sampleBttvChannelDataNoShared).megaF).toBe("5d4fc81baff6f30ad530cd0d");
        expect(convertBttvChannelDataToEmoteDict(sampleBttvChannelDataNoShared).dealWithIt).toBe("6057e66961e7e44b5aa4f050")
    })

    test('with valid input that doesnt have channel emotes, returns proper data structure', () => {
        expect(convertBttvChannelDataToEmoteDict(sampleBttvChannelDataNoChannel).megaF).toBe("5d4fc81baff6f30ad530cd0d");
        expect(convertBttvChannelDataToEmoteDict(sampleBttvChannelDataNoChannel).dealWithIt).toBe("6057e66961e7e44b5aa4f050")
    })

    test('with valid input that doesnt have any emotes, returns empty object', () => {
        const result = convertBttvChannelDataToEmoteDict(sampleBttvUserNotFound);
        const keys = Object.keys(result);
        expect(keys.length).toBe(0)
    })
})

describe("BTTV Integration -> getBttvImageUrl", () => {
    test('if no id passed, is an empty string, or id isnt a string, return null', () => {
        expect(getBttvImageUrl()).toBe(null);
        expect(getBttvImageUrl("")).toBe(null);
        expect(getBttvImageUrl({ "link": "blah.com/blah" })).toBe(null);
    })

    test('if valid id passed, returns string', () => {
        expect(typeof getBttvImageUrl("60636293a407570b72f2807b")).toBe("string")
    })

    test('if valid id passed, returns proper image link', () => {
        expect(getBttvImageUrl("60636293a407570b72f2807b")).toBe("https://cdn.betterttv.net/emote/60636293a407570b72f2807b/3x")
    })
})

describe("BTTV Integration -> addGlobalEmotesToDict", () => {
    test('if argument not an object, or not provided, returns null', async () => {
        await expect(addGlobalEmotesToDict()).resolves.toBe(null);
        await expect(addGlobalEmotesToDict("hi i'm not an object hehe", fetchFunction)).resolves.toBe(null);
    })

    test('valid argument  (including empty object/dict) returns correct object with global emotes in them', async () => {
        const response = await addGlobalEmotesToDict({}, fetchFunction);
        expect(response.AngelThump).toBe('566ca1a365dbbdab32ec055b');
        expect(response.DuckerZ).toBe('573d38b50ffbf6cc5cc38dc9');
        const responseWithIngoingDict = await addGlobalEmotesToDict({ "testytestytesty": "yup i'm still here" }, fetchFunction);
        expect(responseWithIngoingDict.testytestytesty).toBe("yup i'm still here");
        expect(responseWithIngoingDict.FeelsBadMan).toBe("566c9fc265dbbdab32ec053b")
    })
})