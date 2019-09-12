---
layout: default.njk
tags: post
title: Extensive CSS comments
publishDate: 12. September 2019
date: 2019-09-12
---

```scss
/*------------------------------------*\
    #TABLE
\*------------------------------------*/

$table-offset:                       $GLOBAL-SPACING-UNIT-SMALL !default;
$table-cell-spacing-vertical:        0 !default;
$table-cell-spacing-horizontal:      $GLOBAL-SPACING-UNIT-SMALL !default;

/*
 * [1] The horizontal border-spacing on the table indents the table of the same
 *     amount from the surrouning flowing content. Unfortunately, there is no
 *     way to work around this and normally would result in something like this:
 *     ________________________________________________
 *     .                                              .
 *     .         VISUAL LAYOUT REPRESENTATION         .
 *     .              OF A CONTENT PAGE               .
 *     .                                              .
 *     .   |                                     |    .
 *     .   | Normal flow content above the table |    .
 *     .   |                                     |    .
 *     .                                              .
 *     .     |           The table             |      .
 *     .     |                                 |      .
 *     .     | The table will be indented left |      .
 *     .     | and right by the amount of the  |      .
 *     .     |      border-spacing value       |      .
 *     .                                              .
 *     .   |                                     |    .
 *     .   | Normal flow content below the table |    .
 *     .   |                                     |    .
 *     .                                              .
 *     ________________________________________________
 *
 *     We use a negative margin on the left equal to
 *     `$table-cell-spacing-horizontal` to align it with the content on the
 *     left. Increasing the offset on the right side of the table slightly at
 *     the same time prevents horizontal scrollbars as well as don’t letting it
 *     look like an accident. This is the least we can do and results in
 *     something that looks like this:
 *     ________________________________________________
 *     .                                              .
 *     .         VISUAL LAYOUT REPRESENTATION         .
 *     .              OF A CONTENT PAGE               .
 *     .                                              .
 *     .   |                                     |    .
 *     .   | Normal flow content above the table |    .
 *     .   |                                     |    .
 *     .                                              .
 *     .   |           The table             |        .
 *     .   |                                 |        .
 *     .   | The table will be flushed on    |        .
 *     .   | the left with the other content |        .
 *     .   | and the right side’s offset is  |        .
 *     .   | increased slightly              |        .
 *     .                                              .
 *     .   |                                     |    .
 *     .   | Normal flow content below the table |    .
 *     .   |                                     |    .
 *     .                                              .
 *     ________________________________________________
 *
 * [2] Tables are always full-width by default.
 * [3] Set all columns to an equal width by default.
 */
.c-table-wrapper {
    @if ($table-cell-spacing-horizontal != 0) {
        margin-left: -($table-cell-spacing-horizontal); /* [1] */
        padding-right: $table-offset; /* [1] */
    }

    table {
        width: 100%; /* [2] */
        border-spacing: $table-cell-spacing-horizontal $table-cell-spacing-vertical;
        table-layout: fixed; /* [3] */
    }

}
```
