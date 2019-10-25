---
layout: default.njk
tags: post
title: Global Sass variables
publishDate: 23. October 2019
date: 2019-10-23
---

There are tow different kinds of Sass variables regarding their scope.
- [module variables](link to post) specific to a certain element/component
- global variables that are used in several instances

```scss
$GLOBAL-VARIABLE: foo !default;
```

vs.

```
$local-variable: $GLOBAL-VARIABLE !default;
```

## CSS custom properties

```
--GLOBAL-VARIABLE: foo;
```
