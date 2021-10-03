# showmy.chat

**On-Demand, Themeable Twitch Chat Overlays For Everyone**

This is the repo for [showmy.chat](https://showmy.chat), an on-demand themed Twitch chat overlay generator. These chat overlays can be used in broadcasting software such as [OBS](https://obsproject.com).

**What does this mean?** It means that anyone can go to [showmy.chat](https://showmy.chat), enter the name of their Twitch channel, and select a theme, and they'll get a URL they can use as a source in their broadcasting software of choice to display a live chat feed!

## Goals

**showmy.chat** is intended to be a quick, easy, plug-and-play solution for getting themed chat overlays right out of the box. Because of this, it doesn't currently support any customization beyond selecting your theme. This could change later, so long as the user experience of generating your themed overlay remains quick and easy.

## Contributing

**showmy.chat** is thrilled to accept contributions! Please read [the contributing guide](CONTRIBUTING.md) to see how you can contribute!

## Colophon

**showmy.chat** is built with the [Eleventy](https://11ty.dev) static site generator — in particular, using the [Eleventy Serverless](https://www.11ty.dev/docs/plugins/serverless/) functionality. It is hosted with gratitude on [Netlify](https://netlify.com).

**showmy.chat** overlays leverage [ComfyJS](https://github.com/instafluff/ComfyJS), which in turn is built on top of [tmi.js](https://tmijs.com), to receive and parse messages. Major thanks to everyone in these communities who have done the hard work to ensure that interacting with Twitch's chat API is as easy as possible.

Finally, **showmy.chat** is indebted to [Style Stage](https://stylestage.dev), [Stephanie Eckles](https://thinkdobecreate.com)'s modern spiritual successor to [CSS Zen Garden](http://www.csszengarden.com), for inspiration. Style Stage demonstrates how the same markup can be styled in a plethora of creative ways, and leverages community-contributed stylesheets. **showmy.chat** was initially conceived of as "What if Style Stage, but for Twitch chat overlays?"