---
layout: default.njk
tags: post
title: The <s aria-hidden="true">art</s> duty of a good commit message
publishDate: 02. February 2020
date: 2020-02-02
---

Often times I see Git being used just as a tool to store the current state of the codebase, like a Dropbox for code. Each commit and push is like a <kbd>cmd + s</kbd>, just to make sure that it is safe in case something happens to the computer. To me this always seems like Git being degraded to just a fallback tool. However, Git can be so much more. There are many features of Git that can contribute to a really good develper and development-team workflow. But arguably the most important ingredient of Git are commits. So that’s what I will cover in this post—what makes a good commit, what is a good commit message and how to write one.

## Write commit messages altogether

This may seem like a redundant point as commits without commit messages are not even possible in Git. The point I’m trying to make here is to write a somewhat sensible commit message at all. Here is an exemplary Git history, somewhat close to instances I’ve witnessed myself:

```text
* 292f678 bugfix
* 4de36aa bugfix
* 6286b95 bugfix
* 206c0f2 bugfix
* 2648eb3 button
* f556eb7 button
* 0319108 button
```

Looking at a history like this, it is quite obvious that the author didn’t make any effort to think about proper commit messages. They most likely repeated the same commit message over and over just to snapshot the individual development steps away. What this leaves us with is a Git history of no value in any sense. Why was it necessary to sacrifice four single commits just to fix one bug (apparently). And what are the individual commits of the button about? What that history could look like so it would make much more sense to everybody later:

```text
* 292f678 fix missing click event on button
* 2648eb3 enable icons inside of buttons
* f556eb7 enhance button with secondary variant
* 0319108 add button component
```

- Don’t write what code changed in what file—this is information covered in each commit automatically
- Commit early and commit often
    - But maybe squash after the fact?
- Be consistent in form and grammar -> guidelines


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
