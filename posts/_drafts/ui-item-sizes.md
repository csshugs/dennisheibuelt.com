---
layout: default.njk
tags: post
title: Keeping consistency of element’s heights
tldr: You should create a set of sizes (i.e. heights) for UI elements in your project, so you are more consistent when it comes to the height of individual elements and the overall vertical appearance of your UI.
publishDate: 06.09.2019 
date: 2019-09-06
---

One thing you should definitely do in your project is to manage all your spacings with a proper system in place, meaning that you have a defined set of spacing values that you can pick from instead of using fixed `px` values for every instance you assign a `padding` or a `margin` in your CSS. For this you may want to use a preprocessor like [Sass](https://sass-lang.com) or you can use [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*). The reasoning for this is to avoid hoarding a whole slew of different values for spacings that could be reduced to a minimum set of actually needed values. By storing every spacing variant in a list or as a simple variable, you create a set of allowed spacings that can be used in your project. And the next time you need to assign a `margin-bottom` to a component, you don’t write:

```css
.component {
    margin-bottom: 24px;
}
```

Instead you write this:

```scss
// SCSS
.component {
    margin-bottom: $global-spacing-unit;
}

// CSS
.component {
    margin-bottom: var(--global-spacing-unit);
}
```

This way, you force yourself to always grab a spacing out of your set and don’t “invent” new values.

## Let’s cut to the chase

I’ve been managing my spacings like this for several years now and it really helped me keeping the code and the look of my projects being consistent. However, just recently I found myself declaring a `height` for a new component in my current project like this for the umpteenth time:

```scss
$component-height: 115px !default;

.component {
    height: $component-height;
}
```

I realised that I did this way too often now with way too many different values and noticed that I more or less just took the sizes that were defined like this in the design department and incorporated them into the project without thinking about it — so I did an inventory of all the elements in the project that somehow have a (visually) fixed height, e.g. buttons and other interaction elements, inputs, checkbox and radio buttons, toggles, loading spinners etc. This is what I came up with:

```
- 198
- 154
- 115
- 108
- 80
- 75
- 70
- 58
- 50
- 48
- 44
- 40
- 35
- 32
- 30
- 29
- 25
- 12
```

These are all the different heights (in `px`) that are defined for various components. It’s not necessarily about the amount of different sizes but about those sizes that are almost the same, e.g. `115` and `108` or `48` and `50`. Literally everyone of these little deviations were done by accident — because there was no system in place.

## Combining values

The first task in tackling this problem is to evaluate which sizes can be eliminated or combined respectively.
