---
layout: default.njk
tags: post
title: The art of a good commit message
publishDate: 02. February 2020
date: 2020-02-02
---

#### Give context to your commits

To be able to identify the **WHY** behind a commit at a later point in time, we use the following template for our commit body:

```
<type>[optional scope]: <description> (#<issue number>)

because:
- [relevant context]
- [why you decided to change things]
- [reason you’re doing it now]

this commit:
- [does X]
- [does Y]
- [does Z]
```

— _[Source](https://twitter.com/r00k/status/1175100703829909505)_
