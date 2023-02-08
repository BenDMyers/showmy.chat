# showmy.chat

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

**On-Demand, Themeable Twitch Chat Overlays For Everyone**

[Join the Discord server!](https://discord.gg/K78fXzVxja)

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://benmyers.dev"><img src="https://avatars.githubusercontent.com/u/18060369?v=4?s=100" width="100px;" alt="Ben Myers"/><br /><sub><b>Ben Myers</b></sub></a><br /><a href="https://github.com/BenDMyers/showmy.chat/commits?author=BenDMyers" title="Code">💻</a> <a href="#design-BenDMyers" title="Design">🎨</a> <a href="#infra-BenDMyers" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://non-traditional.dev"><img src="https://avatars.githubusercontent.com/u/5460770?v=4?s=100" width="100px;" alt="Travis Waith-Mair"/><br /><sub><b>Travis Waith-Mair</b></sub></a><br /><a href="#design-Jarvis1010" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://twitter.com/chantastic"><img src="https://avatars.githubusercontent.com/u/658360?v=4?s=100" width="100px;" alt="Michael Chan"/><br /><sub><b>Michael Chan</b></sub></a><br /><a href="#content-chantastic" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ajcweb.dev/"><img src="https://avatars.githubusercontent.com/u/12433465?v=4?s=100" width="100px;" alt="Anthony Campolo"/><br /><sub><b>Anthony Campolo</b></sub></a><br /><a href="https://github.com/BenDMyers/showmy.chat/commits?author=ajcwebdev" title="Documentation">📖</a> <a href="https://github.com/BenDMyers/showmy.chat/commits?author=ajcwebdev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://helloyes.dev"><img src="https://avatars.githubusercontent.com/u/4201323?v=4?s=100" width="100px;" alt="Thomas Michael Semmler"/><br /><sub><b>Thomas Michael Semmler</b></sub></a><br /><a href="#translation-nachtfunke" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://alex.party"><img src="https://avatars.githubusercontent.com/u/13134182?v=4?s=100" width="100px;" alt="Alex Riviere"/><br /><sub><b>Alex Riviere</b></sub></a><br /><a href="#content-fimion" title="Content">🖋</a> <a href="#design-fimion" title="Design">🎨</a> <a href="https://github.com/BenDMyers/showmy.chat/commits?author=fimion" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KenAKAFrosty"><img src="https://avatars.githubusercontent.com/u/90424167?v=4?s=100" width="100px;" alt="Ken aka Frosty"/><br /><sub><b>Ken aka Frosty</b></sub></a><br /><a href="#content-KenAKAFrosty" title="Content">🖋</a> <a href="https://github.com/BenDMyers/showmy.chat/commits?author=KenAKAFrosty" title="Code">💻</a> <a href="#infra-KenAKAFrosty" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://nickymeuleman.netlify.app/"><img src="https://avatars.githubusercontent.com/u/30179461?v=4?s=100" width="100px;" alt="Nicky Meuleman"/><br /><sub><b>Nicky Meuleman</b></sub></a><br /><a href="#design-NickyMeuleman" title="Design">🎨</a> <a href="https://github.com/BenDMyers/showmy.chat/commits?author=NickyMeuleman" title="Code">💻</a> <a href="#tool-NickyMeuleman" title="Tools">🔧</a> <a href="https://github.com/BenDMyers/showmy.chat/commits?author=NickyMeuleman" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.mikeaparicio.com"><img src="https://avatars.githubusercontent.com/u/242304?v=4?s=100" width="100px;" alt="Mike Aparicio"/><br /><sub><b>Mike Aparicio</b></sub></a><br /><a href="#design-peruvianidol" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://redsparr0w.com"><img src="https://avatars.githubusercontent.com/u/7288322?v=4?s=100" width="100px;" alt="Danial"/><br /><sub><b>Danial</b></sub></a><br /><a href="#design-RedSparr0w" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.frontend.horse"><img src="https://avatars.githubusercontent.com/u/19617280?v=4?s=100" width="100px;" alt="Alex Trost"/><br /><sub><b>Alex Trost</b></sub></a><br /><a href="#content-a-trost" title="Content">🖋</a> <a href="#design-a-trost" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://youtube.com/kevinpowell"><img src="https://avatars.githubusercontent.com/u/25749407?v=4?s=100" width="100px;" alt="Kevin Powell"/><br /><sub><b>Kevin Powell</b></sub></a><br /><a href="#content-kevin-powell" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.jacobbolda.com"><img src="https://avatars.githubusercontent.com/u/2019387?v=4?s=100" width="100px;" alt="Jacob Bolda"/><br /><sub><b>Jacob Bolda</b></sub></a><br /><a href="#content-jbolda" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://teachjenntech.com"><img src="https://avatars.githubusercontent.com/u/77285384?v=4?s=100" width="100px;" alt="Jenn Junod"/><br /><sub><b>Jenn Junod</b></sub></a><br /><a href="https://github.com/BenDMyers/showmy.chat/commits?author=jennjunod" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://maciejpedzi.ch"><img src="https://avatars.githubusercontent.com/u/68030845?v=4?s=100" width="100px;" alt="Maciej Pędzich (Mac)"/><br /><sub><b>Maciej Pędzich (Mac)</b></sub></a><br /><a href="#content-maciejpedzich" title="Content">🖋</a> <a href="#design-maciejpedzich" title="Design">🎨</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
