---
layout: default.njk
tags: post
title: Keeping consistency of element’s heights
tldr: You should create a set of sizes for UI elements in your project, so you are more consistent when it comes to the height of individual elements and the overall vertical appearance of your UI.
publishDate: 9. September 2019
date: 2019-09-09
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

## From spacings to element sizes

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

The first task in tackling this problem is to evaluate which sizes can be eliminated or combined respectively. We managed to compress our element sizes to this:

```
- 198
- 154
- 110
- 80
- 70
- 60
- 50
- 40
- 30
- 25
- 12
```

As you can see, we successfully **shrinked our list from 18 to 11 entries** by removing certain values and combining other ones. This already looks and feels more consistent and clear just by looking at the list alone.

## Creating a system

In order to effectively use these new values across our project and ensure that only these values are assigned in the CSS, we have to do more than to just provide this list as a loose reference — **the code itself has to be the reference**.

### Creating a global Sass map

As my CSS preprocessor of choice is Sass, please bear with me here if you have other preferences. Nonetheless, the concept behind this remains the same. So here is what I do in Sass:

```scss
$UI-ELEMENT-SIZES: (
    tera:  198px,
    giga:  154px,
    mega:  110px,
    kilo:  80px,
    hecto: 70px,
    deca:  60px,
    base:  50px,
    deci:  40px,
    centi: 30px,
    milli: 25px,
    micro: 12px,
) !default;
```

As you can see, I put all the sizes that we agreed upon in a Sass map. The difficult thing here is (as it is most of the time) the naming. We need something generic, but on the other hand, when we discuss the UI with anyone in the project team, in my experience it is more transparent to use clear and unambiguous namings for the different variants. T-Shirt sizes (XS, S, M, L, XL etc.) are very well scalable and do make sense from a programmatic point of view, but when we actually _talk_ about a specific UI component’s height, nobody can really grasp what it means when we say: “Oh, this should have a height of ‘XXL’”, because ‘XXL’ isn’t really that concrete as it is easy to mix up with ‘XL’ or ‘XXXL’. In the end, most of the time we will end up looking up the actual sizes in a separate list because nobody can memorize the different values.

An extreme counterexample would be to name the sizes e.g. ‘Maggie’, ‘Lisa’, ‘Bart’, ‘Homer’ and ‘Marge’. While this is very well memorable (assuming most people know The Simpsons), it is not very scalable as The Simpsons only have five family members. Yes, we could expand the family to Grampa Simpson, Santa’s Little Helper, Snowball I – V and Hugo. But still, this scale ends very soon and it also gets more ambiguous very quick.

So, when it comes to naming we’ll notice that scalability comes at the price of ambiguity and vice versa. By using the prefixes of the [International System of Units (SI)](https://en.wikipedia.org/wiki/International_System_of_Units#Prefixes), the hope is to have a sane compromise between unambiguity, memorability and scalability. So for now, we stay with that naming.

### Using the map

Still, just having a Sass map in place doesn’t bring us much of an advantage. Of course, we need to use the entries of the map. We could just do that by using the built-in Sass function `map-get()`. But what I like to do is to create a custom function:

```scss
@function ui-size($size: base) {
    @return map-get($UI-ELEMENT-SIZES, $size);
}
```

As you can see, this function really doesn’t do any more than a basic `map-get()` but I consider a custom function name more clear as it instantly communicates what it does just by its name. Also, when we look at its usage:

```scss
.foo {
    width: ui-size(hecto);
}
```

we see that we don’t need to pass the name of the Sass map each time we call the funtion. All we need to do is to pass in the sizing identifier of the value we want to get from the map.

## Conclusion

The approach depicted above is something I’ve never done in a project before. I do not doubt that the Sass part of it doesn’t work technically. The thing I’m curious about is if the naming will work across all the disciplines in the project and how everyone will adapt to it. It may well be, that this naming will also be too ambiguous and that we need to think about a better naming approach that’s more memorable, yet still scalable.

Anyway, I’m sure that this approach is certainly better than doing it the way I was before. Naming aside, having a system in the code ensures that **everything remains consistent** — in the code and, more importantly, in the resulting project’s UI.
