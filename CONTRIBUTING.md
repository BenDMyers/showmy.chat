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

http://localhost:8080/c/showmychat?theme=your-theme-here&DEMO=true

You can look at the other theme stylesheets in the directory to get inspiration!
