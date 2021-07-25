---
permalink: false
---
# `eleventy-plugin-twitch-chat` Temporary Port

Traditionally, [Eleventy transforms](https://www.11ty.dev/docs/config/#transforms) use file output paths to determine whether the file type is appropriate for transformations. However, serverless templates don't currently support `outputPath` (see 11ty/eleventy#1901).

In the meantime, this is a temporary local port of [`eleventy-plugin-twitch-chat`](https://npmjs.com/package/eleventy-plugin-twitch-chat), whose transform has been modified to assume that *all* transformed files are HTML. This definitely isn't a safe assumption for a production-ready plugin, but I think it'll apply for long enough here.