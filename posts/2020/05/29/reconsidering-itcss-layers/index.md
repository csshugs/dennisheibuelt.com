---
layout: default.njk
tags: post
title: Reconsidering ITCSS layers
publishDate: 29. May 2020
date: 2020-05-29
---

It feels like I’ve scaffolded my Sass folder structure like this forever now:

```
scss
├── 01-settings
├── 02-tools
├── 03-generic
├── 04-elements
├── 05-objects
├── 06-components
├── 07-utilities
└── main.scss
```

This approach is named [ITCSS](https://www.skillshare.com/classes/Modern-CSS-Writing-Better-Cleaner-More-Scalable-Code/771669373?via=search-layout-grid) and was invented by [Harry Roberts](https://csswizardry.com/). 

Since using this approach of layering different parts of the Sass codebase into its own respective folder, I’ve never had any issues with overriding CSS or other problems with the cascade or specificity. It really helped me a lot with maintaining code on a large scale.

There is one issue though, that I ran into in almost every project.

## Dependency between different layers

Let’s say we define our global colors in a Sass map in `01-settings/settings.colors.scss`:

```scss
// 01-settings/settings.colors.scss

$COLORS: (
    "primary": #2a628f,
    "neutral": #fff,
    "black": #000,
    "grey": #ccc,
) !default;
```

And we use these colors in our codebase via a Sass function that is defined in `02-tools/tools.color.scss`:

```scss
// 02-tools/tools.color.scss

@function color($color) {
    @if (map-has-key($COLORS, $color)) {
        $color: map-get($COLORS, $color);
        @return $color;
    } @else {
        @error "`#{$color} is not defined in the `$COLORS` map.";
    }
}
```

We can use the function like this:

```scss
// 06-components/components.button.scss

$button-background-color: color(primary) !default;

.c-btn {
    background-color: $button-background-color;
}
```

No problem until here. But what if we need the Sass function (located in the `02-tools` layer) in another settings file, e.g. `01-settings/settings.forms.scss`, where the function isn’t defined, yet? Let’s recap what our folder structure looks like:

```
scss
├── 01-settings
│   ├── settings.forms.scss
│   └── settings.colors.scss
├── 02-tools
│   └── tools.color.scss
├── 03-generic
├── 04-elements
├── 05-objects
├── 06-components
│   └── components.button.scss
├── 07-utilities
└── main.scss
```

`01-settings/settings.forms.scss` is meant to combine all Sass variables responsible for unifying the styling of all kinds of form elements (text-inputs, textareas, selects etc.).

However, if we want to assign a color with the `color()` function in `01-settings/settings.forms.scss`, that is not possible, as the function is not available, yet:

```scss
// 01-settins/settings.forms.scss

$FORM-BORDER-COLOR: color(grey) !default; // Nope!
```

## Cheating around the problem

What I ended up doing most of the time, was breaking the layer order by just putting these functions in the settings layer:

```
scss
├── 01-settings
│   ├── settings.colors.scss
│   ├── tools.color.scss
│   └── settings.forms.scss
├── 02-tools
├── 03-generic
├── 04-elements
├── 05-objects
├── 06-components
├── 07-utilities
└── main.scss
```

Yes it works, but at the very least it just feels plain wrong — With the strict layer architecture, we have a really steady methodology that brings us so much advantages. But we need to work around it in some individual cases like this. 

Well guess what: Maybe there is a reason we need to work around this all the time; Maybe there is a way to fix this.

## What’s the settings layer for anyway?

Usually, what I define 95% of the time in the settings layer are things like:

- spacings
- colors
- typography
- breakpoints
- shadows
- borders

Did you ever heard of the term [“Design Tokens”](https://css-tricks.com/what-are-design-tokens/)? The things listed above are exactly that — Design Tokens.

But what about the forms example from above? Well, defining global styles for all of your form elements like text-inputs, textarea, selects etc. are definitely global **settings**, but they are not quite that high-level as Design Tokens are, right?

So, it seems like, we have two kinds of global settings:

- Design tokens
- Shared settings

## Introducing a new layer

After we identified that we actually have two kinds of global settings, it becomes clear that only the shared settings are potentially dependent on previously defined Sass functions. So why not split up the layers and put the tools layer in between?

1. Design tokens
2. Tools
3. Shared settings

This is a way more clean dependency chain that actually works and does not require any workarounds.

## New Layer structure

What this gives us is a new layer structure with slightly adapted layer naming:

```
scss
├── 01-tokens
│   └── tokens.colors.scss
├── 02-tools
│   └── tools.color.scss
├── 03-shared
│   └── shared.forms.scss
├── 04-generic
├── 05-elements
├── 06-objects
├── 07-components
├── 08-utilities
└── main.scss
```

All the global design tokens are defined in the first layer and do not have any dependencies among themselves, just like the global functions and mixins in the tools layer. All the shared settings in the third layer are dependent on both preceding layers and provide combined sets of global settings for everything that comes after.

I’m pretty confident, that this is a way more clean approach that also eliminates the need for a specific `@import` order of certain Sass modules in the settings and tools layer. Also this is a good example of the adaptability of ITCSS which explicitly encourages you to change/extend the layers as you may see fit.
