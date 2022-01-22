# Contributing to showmy.chat

**showmy.chat** is an Eleventy project that utilizes Eleventy Serverless.

## Test locally

Install dependencies and start up the development server.

```bash
npm i
npm run dev
```

Open up [localhost:8080](http://localhost:8080) to see the project.

## Contribute a Theme

To make a theme, create a new stylesheet in the `src/themes` directory. The stylesheet name will be picked up and used as the name of the theme. To get a sense of the selectors you can use, run the project locally and navigate to a demo page such as:

<http://localhost:8080/c/showmychat?theme=your-theme-here&DEMO=true>

You can look at the other theme stylesheets in the directory to get inspiration!

## Code style

A consistent coding style is automatically checked by various tools[^1].

<!-- MD046 is useful, but reports a false positive for footnote-syntax as it's a non-standard md feature -->
<!-- markdownlint-disable MD046 -->

[^1]: The tools used are:

    - JavaScript is checked by [ESLint](https://eslint.org/)
    - CSS is checked by [Stylelint](https://stylelint.io/)
    - Markdown is checked by [Markdownlint](https://github.com/DavidAnson/markdownlint)
    - HTML is checked by [HTMLHint](https://htmlhint.com/)
    - General formatting is checked by [Prettier](https://prettier.io/)

If you'd like to suggest tweaks to the rules for these tools that are currently used, please open an [issue on GitHub](https://github.com/BenDMyers/showmy.chat/issues)!

The goal is for these tools to enable folks, not hinder them.
They are meant to function in a way that gives contributors a helpful guide, not as a restrictive tool.

These tools are ran automatically upon commit by using a [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).
When a tool reports an error for a file included in your commit, the commit will not succeed by default.

### Pushing a commit with linting errors

If you wish to ignore this check, add `--no-verify` to your git commit command.
For example `git commit -m "a commit with linting errors" --no-verify` will succeed.

### Disabling rules set by these tools

- [ESLint disable instructions](https://eslint.org/docs/user-guide/configuring/rules#disabling-rules)
- [Stylelint disable instructions](https://stylelint.io/user-guide/ignore-code/)
- [Markdownlint disable instructions](https://github.com/DavidAnson/markdownlint#configuration)
- HTMLHint rules have to be disabled project-wide via [the `.htnlhintrc` file in the project root](https://htmlhint.com/docs/user-guide/configuration)
- [Prettier disable instructions](https://prettier.io/docs/en/ignore.html)

### Direct editor feedback

Many of the used tools have editor-specific extensions that will show their output right underneath the relevant line of code in your editor.
While it is not necessary to use these extensions as these tools will function without them, using them can provide a neat productivity boost.

For VSCode, this project suggests some extensions to be used on this codebase.
They will be automatically presented when you first open this workspace in VSCode.

For other editors, similar extensions often exist, with suggestions given in the docs for that tool.
For example: [Prettier editor integration docs](https://prettier.io/docs/en/editors.html), [ESLint integrations](https://eslint.org/docs/user-guide/integrations), ...
