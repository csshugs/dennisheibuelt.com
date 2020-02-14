---
layout: default.njk
tags: post
title: Using Sass functions for styling
publishDate: 14. February 2020
date: 2020-02-14
---

More and more, I find myself using Sass functions for simple styling assignments, instead of plain Sass variables. E.g., when I want to define a `font-weight`, I don’t write this:

```scss
// _settings.font-weights.scss
$FONT-WEIGHT-LIGHT:   300 !default;
$FONT-WEIGHT-REGULAR: 400 !default;
$FONT-WEIGHT-BOLD:    700 !default;
$FONT-WEIGHT-BLACK:   900 !default;


// _components.module.scss
$module-title-font-weight: $FONT-WEIGHT-BOLD !default;

.c-module__title {
    font-weight: $module-title-font-weight;
}
```

But instead:

```scss
// _settings.font-weights.scss
$FONT-WEIGHTS: (
    light:   300,
    regular: 400,
    bold:    700,
    black:   900,
) !default;


// _tools.font-weight.scss
@function font-weight($font-weight: regular) {
    @if (map-has-key($FONT-WEIGHTS, $font-weight)) {
        @return map-get($FONT-WEIGHTS, $font-weight);
    } @else {
        @error "`#{$font-weight}` is no valid key in the `$FONT-WEIGHTS` map. Please only use font-weights that are defined in that map.";
    }
}


// _components.module.scss
$module-title-font-weight: font-weight(bold) !default;

.c-module__title {
    font-weight: $module-title-font-weight;
}
```

Why am I doing it this way? 

First and foremost: I find this way more readable. Especially since we have a variety of `font-weight`s to choose from, putting them in a Sass map is more clear as it almost looks like a table with key-value pairs.

## Parameterizability (is that even a word?)

Another good argument for using functions is that they are dynamic. Variables are (on its own) static. You either want the thing that the variable represents or you use another (static) variable. But functions can take up arguments. Let’s look at another example to make this more clear.

When it comes to spacings in a project, I base everything on a global baseline, which is related to the typography, hence the `rem` unit. And since I’m using fluid typography, this has the advantage that all the spacings change according to the font-size.

So essentially what I do is, I base all the spacings and its variants (tiny, small, large, huge) on the global baseline, so every spacing is a multiple of the global baseline.

```scss
// _settings.spacings.scss
$BASELINE: 0.25rem !default;

$SPACINGS: (
    "tiny":  $BASELINE * 2,
    "small": $BASELINE * 4,
    "base":  $BASELINE * 6,
    "large": $BASELINE * 8,
    "huge":  $BASELINE * 12,
) !default;
```

I can then provide a Sass function that returns the appropriate spacing, depending on the argument with which I call the mixin.

```scss
// _tools.spacing.scss
@function spacing($variant: base) {
    // The contents of the function doesn’t really matter here.
}
```

So I can (just like with the `font-weight` described above) assign spacings with the function and define the variation of the spacing via the function’s argument. Notice the handy default parameters that functions provide, so I can call the function without an argument.

```scss
// _components.module.scss
$module-padding:              spacing(small) !default;
$module-title-spacing-bottom: spacing() !default;

.c-module {
    padding: $module-padding;
}

    .c-module__title {
        margin-bottom: $module-title-spacing-bottom;
    }
```

Now this provides me a function with five possible values for the parameter, i.e. five different spacing variants to choose from. However, at least in a larger project, it’s questionable that five spacing variants will suffice to cover all the necessary spacings in a design.

Let’s say, I need a spacing that is larger than `tiny`, but smaller than `small`. Instead of enhancing the `$SPACINGS` map and trying to come up with additional names for the extra spacing variants, I can also take the existing ones, and deviate from those via a second parameter in the function.

```scss
$special-spacing: spacing(small, -1);
```

In this example, I’m saying: “Give me the small spacing variant, but subtract one baseline entity (which is `0.25rem`) from that spacing.” This ensures that the resulting spacing is still a multiple of the global baseline.

In this case, I could just as well write it this way and would get the same result:

```scss
$special-spacing: spacing(tiny, +1);
```

So the second argument can be any integer, negative and positive. It determines, how many entities of the global baseline are added (positive integer) or subtracted (negative integer) from the given spacing variant.

## Clearer variable blocks

If we extend this appraoch of extracting assignments from variables to functions, the variable blocks, where all the characteristics of a module are defined, become way clearer and easier to read:

```scss
$module-padding-vertical:       spacing(small) !default;
$module-padding-horizontal:     spacing() !default;
$module-backgorund-color:       color(base) !default;
$module-title-font-size:        font-size(large) !default;
$module-title-font-weight:      font-weight(bold) !default;
$module-title-text-color:       color(base-text) !default;
$module-title-text-color-hover: color(base-text, hover) !default;
$module-icon:                   icon(close) !default;
$module-icon-size:              icon-size(l) !default;
```

Of course, this approach has its limits. If I really only have one static variable that will not change nor has any variants to choose from, it makes no sense to extract this into a function. E.g. imagine that our design has a border-radius of `4px` on all the core interaction elements (buttons, inputs etc.). It’s unlikely, that we need any additional border-radii on any of our UI elements that are not `4px`, beacuse that would make the design inconsistent (exceptions are always possible!). So writing this still makes totally sense:

```scss
$BORDER-RADIUS: 4px !default;
```

On the other hand, extracting this into a function, too, may not bring us any logical benefits, but it doesn’t cost us anything neither because both methods result in the same compiled CSS. It depends on if you prefer to have the total consistency in your variable blocks (all functions) or if you don’t want to overcomplicate it by writing a zillion functions for every little design feature.
