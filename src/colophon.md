---
layout: page.html
title: Colophon
---

**showmy.chat** was built as an experiment with the [Eleventy](https://11ty.dev) static site generator's new on-demand [Eleventy Serverless](https://www.11ty.dev/docs/plugins/serverless/) build mode. To learn more about Eleventy Serverless, [see my stream with Eleventy creator Zach Leatherman](https://someantics.dev/first-look-eleventy-serverless/).

**showmy.chat** is hosted gratefully on [Netlify](https://netlify.com).

**showmy.chat** could not be possible without the hard work put into [ComfyJS](https://github.com/instafluff/ComfyJS/), a wrapper around [tmi.js](https://tmijs.com/) that makes Twitch chats' web sockets easy to use.

The styles are currently powered by Lucas Larroche's [Pico](https://picocss.com/) styles.

Coding styles for this project are automatically checked and upheld by various linting/formatting tools[^1].

<!-- MD046 is useful, but reports a false positive for footnote-syntax as it's a non-standard md feature -->
<!-- markdownlint-disable MD046 -->

[^1]: The tools used are:

    - JavaScript is checked by [ESLint](https://eslint.org/)
    - CSS is checked by [Stylelint](https://stylelint.io/)
    - Markdown is checked by [Markdownlint](https://github.com/DavidAnson/markdownlint)
    - HTML is checked by [HTMLHint](https://htmlhint.com/)
    - General formatting is checked by [Prettier](https://prettier.io/)
