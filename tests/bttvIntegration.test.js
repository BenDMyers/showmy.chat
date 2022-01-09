const m = require('../src/scripts/bttvIntegration.js');

describe("BTTV integration", () =>{ 
    test('replaces basic string with matching value properly', ()=>{ 
        expect( m.replaceKeywordWithEmoteImageString("hello hi hell hellp phello","hello","getrekt.png",69420) )
        .toBe('<img alt="hello" data-twitch-emote="hello" data-twitch-emote-id="69420" src="getrekt.png"></img> hi hell hellp phello')
    })

    test('missing parameters return null', ()=>{ 
        expect(m.replaceKeywordWithEmoteImageString()).toBe(null)
    })
})
