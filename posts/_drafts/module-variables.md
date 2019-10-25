---
layout: default.njk
tags: post
title: Sass module variables
publishDate: 25. October 2019
date: 2019-10-25
---

When you are about to create a white label solution for a client or want your product to be themable, one approach is to use Sass module variables. This post will show you what module variables are and why they are a useful addition to your way of creating components in Sass.

## What are module variables?

What I describe as module variables is a set of Sass variables that are defined at the top of each of your Sass partials. All these variables are only affecting this partials code and are not used in other partials. So instead of writing your Sass code like this:

```scss
// module.scss

.c-module {
    padding: 24px 16px;
    border-radius: 4px;
}

    .c-module__title {
        font-size: 2rem;
    }
```

With module variables, it would look like this:

```scss
// module.scss

$module-padding-vertical:   24px !default;
$module-padding-horizontal: 16px !default;
$module-border-radius:      4px !default;
$module-title-font-size:    2rem !default;

.c-module {
    padding: $module-padding-vertical $module-padding-horizontal;
    border-radius: $module-border-radius;
}

    .c-module__title {
        font-size: $module-title-font-size;
    }
```

The goal is to extract all the “moving parts” of a design into a variable, i.e. everything that could potentially need to be changed, should be easily changeable via the respective variable at the top of the partial.

## What is changeable?

The number of CSS properties that are changeable is limited and blending. I.e. things like colors and sizes are totally suited to be extracted into their own variables. 

```scss
$module-background-color: hotpink !default;
$module-title-text-color: #222 !default;
```

But when it comes to things like values for the `position` or `display` property — maybe that isn’t something to be extracted into a variable.

## Formatting

- align values
- prefix variables with module name
    - Sass modules -> no more need to prefix

- useful not only for white label products
- easily tweakable component characteristics

- Serves as a kind of module config.
- Add **everything** as a module variable.
