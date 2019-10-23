---
layout: default.njk
tags: post
title: Global Variables
publishDate: 23. October 2019
date: 2019-10-23
---

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
