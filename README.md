# README

I’m using the fabulous [11ty](https://www.11ty.io/) static site generator for building my blog.

## Getting Started

To get started, install all npm dependencies:

```
$ npm install
```

## Running

If you are tweaking things on the blog or are working on posts, you can run the 11ty server:

```
$ npx eleventy --serve
```

This starts a local server on [http://localhost:8081](http://localhost:8081) and watches the templates and posts for changes and reloads the browser if file updates were detected.

## Generate

If you want to generate a static output of the website, run:

```
$ npm run eleventy
```

This generates the static website into the `_site/` folder.
