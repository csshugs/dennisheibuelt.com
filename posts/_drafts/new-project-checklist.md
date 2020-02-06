---
layout: default.njk
tags: post
title: New project checklist
publishDate: 12. September 2019
date: 2019-09-12
---

## Adjust Git user settings

Go to `.git/config` in the project folder and add:

```
[user]
    name = John Doe
    email = john_doe@example.com
    signingkey = xxxxxxxxxxxxx
```

- `signingkey` for GPG keys (if you have several different ones)

to override the global Git settings, which may contain your personal email address.

## Establish Guidelines

This should be the first thing you do, **before** you write any code in the project! Make sure you have guidelines in place for:

- **Git:** What’s your branching strategy? How are commit messages written and formatted? (conventional commits?)
- **Code:** Everything (yes, everything!) should be backed up by coding guidelines. Two spaces or four? Space between colon and value in your CSS declarations? But also the overarching architecture principles should be documented.

## Add linters

* stylelint
* eslint

## Add .editorconfig

```
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 4
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

## `.npmrc`

- Fixed versions
