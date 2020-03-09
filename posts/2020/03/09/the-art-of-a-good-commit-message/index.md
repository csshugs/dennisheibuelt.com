---
layout: default.njk
tags: post
title: The art of a good commit message
publishDate: 09. March 2020
date: 2020-03-09
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

Looking at a history like this, it is quite obvious that the author didn’t make any effort to think about proper commit messages. They most likely repeated the same commit message over and over just to snapshot the individual development steps away. What this leaves us with is a Git history of no value in any sense. Why was it necessary to sacrifice four single commits just to fix one bug (apparently). And what are the individual commits of the button about? What that history could look like so it would make much more sense to everyone later:

```text
* 292f678 fix missing click event on button
* 2648eb3 enable icons inside of buttons
* f556eb7 enhance button with secondary variant
* 0319108 add button component
```

Now it becomes instantly clear what each commit does without looking at the actual code that changed in each respective commit.

## Do not describe the code that changed

One common “mistake” I see a lot is that people try to describe the actual code changes in the commit message:

```text
add contents to README.md
```

Writing that some code was added to the `README.md` file is redundant information as this information is already contained in the commit by itself. Each commit specifies which lines of code were added/removed/changed in what files in a detailed fashion. There is no need to repeat this information in the commit message.

Try to think what this commit message will tell us in 12 months down the road: Okay, in this commit the `README.md` file was changed. But what was added specifically? What content was missing in the `README.md` file before and why did we need to add something? We could have eliminated all these questions in the first place by writing a sensible commit message that doesn’t describe what exactly changed in the code, but rather what was added **substantially** to the project. How did the codebase change quality-wise?

Here is the commit rewritten:

```text
add instructions about setting up local testing
```

Now the commit tells us explicitly what feature was added to the project. Having such commit messages has so much more value in case we look at the Git history at a later point time.

## Use types to categorize your commits

Not every commit represents a new feature. There are different categories a commit can belong to. A sensible list of categories is provided by the [Angular contribution guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type):

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

Using the [Conventional Commits](https://www.conventionalcommits.org/) specification for formatting commit messages, the example from above would then look like this:

```text
docs: add instructions about setting up local testing
```

Using types to categorize your commits has two advantages:

1. It adds clarity to your Git history. Seeing instantly what category a commit belongs to lets your mind filter the list of commits automatically and you will find what you are looking for way quicker.
2. It provides the opportunity of adding automation to your project based on the Git history. E.g. you could automatically generate a changelog by going through all of your commits and assign each commit as a separate changelog entry to the respective category (e.g. “New Features”, “Fixes”, “Minor Changes” etc.) in the changelog.

Of course you can define the list of commit types yourself and enhance it to your likes and needs in your project. E.g. maybe you need a dedicated `release` type for everything related to releasing your project or you want a `chore` type that you can assign tedious, unimportant housekeeping commits to.

## Reference the related ticket or issue in your commits

If you are working with any kind of issue tracker or ticket system (e.g. Jira or GitHub issues) you can utilize this by referencing the ticket number the commit relates to. This gives you easy access at a later point in time to any discussions that happened in the tickets about any features or bugs.

As a general rule of thumb, make no code changes without a corresponding ticket. Every code change should be traceable by the respective ticket. The connection between code change and ticket should be the ticket number in the commit.

When it comes to formatting, just append the ticket number in parentheses with a hash prefix at the end of the commit title:

```text
docs: add instructions about setting up local testing (#21)
```

## Be consistent in form and grammar

One best practice in the open source world seems to be using the imperative form in commit messages. That is, when I write a commit message about the changes I just made to my inputs, I **don’t** write:

```text
removed unused variant
```

...which is the past tense form. Instead, I use the imperative form:

```text
remove unused variant
```

Have a look at [this article](https://chris.beams.io/posts/git-commit/#imperative) to understand, why this is a good practice.

Apart from that, it might be a good idea to further define a set of guidelines for your commit messages, e.g. do you write everything in lower case or do you use sentence case? Or do you use a colon after your commit type (like above) or do you set the commit type inside of square brackets? Write everything down as guidelines to ensure that the form of your commits is as consistent as possible.

## Use the commit body

Everything I covered until here was just about the commit _title_. That is the first line (i.e. the first 72 characters) of each commit message. But of course, that is not the maximum of characters a commit message can contain. By leaving the second line empty, all the following content is reserved for the commit body.

```text
This is the commit title

Everything that comes after the first line 
and one emtpy line is the commit body.

Use the commit body to further explain your
changes and to give context if necessary.
```


## Give context to your commits

Speaking of context, this point is kind of an extension of [“Do not describe the code that changed”](#do-not-describe-the-code-that-changed) from above. 

A fantastic template for the commit body is one that I [adapted from Ben Orenstein](https://twitter.com/r00k/status/1175100703829909505):

```text
&lt;type&gt;[optional scope]: &lt;description&gt; (#&lt;issue number&gt;)

because:
- [relevant context]
- [why you decided to change things]
- [reason you’re doing it now]

this commit:
- [does X]
- [does Y]
- [does Z]
```

This enables us to identify the **WHY** behind a commit and gives us good indication of what to write in the commit message. As a result, we can understand the reasoning behind the code changes at a later point in time without any questions about the context.

[Here is a real-world example](https://github.com/csshugs/FluidMS/commit/4ae74f1c224a408f32d53b67d0a538150e0e386e):

```text
feat: stop shrinking of small type on larger viewports (#21) 

because:
- when the font-size ratio is increased on larger viewports,
the large type gets larger, but the small type is getting
smaller, which is not what we want

this commit:
- stops the shrinking of smaller type (i.e. smaller than the base
font-size) on larger viewports, when the ratio is changed
```

That commit clearly needed some further explaining on **why** we needed to make that change. By following the given template, it becomes far easier to phrase a commit message that makes sense for everyone in the future.

## Conclusion

So these are some of my loose guidelines when it comes to commit message that I try to adhere to. It pretty much all comes down to being as clear and concise as possible by following a common set of conventions and enforcing these conventions consistently, so browsing the Git history becomes an easy task and a joy at any later point in time.
