const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    let markdownIt = require("markdown-it");
    let markdownItAnchor = require("markdown-it-anchor");
    let options = {
        html: true
    };
    let markdownLib = markdownIt(options).use(markdownItAnchor);

    eleventyConfig.setLibrary("md", markdownLib);

    eleventyConfig.addPlugin(syntaxHighlight);

    // Find and copy any `.jpg` files, maintaining directory structure.
    eleventyConfig.addPassthroughCopy("dailyphoto/**/*.jpg");

    // Find and copy any `.jpg` files, maintaining directory structure.
    eleventyConfig.addPassthroughCopy("posts/iceland/**/*.jpg");

    // Generate inline images.
    eleventyConfig.addShortcode("img", function(name, alt, position, link) {
        return `<a title="Click to view large version" href="${link}"><img class="c-img  c-img--${position}" alt="${alt}"
src="${name}"></a>`;
    });

    // Generate responsive image block.
    eleventyConfig.addShortcode("image", function(name, alt) {
        return `<img alt="${alt}"
src="${name}-320.jpg"
srcset="${name}-320.jpg 320w,
        ${name}-480.jpg 480w,
        ${name}-760.jpg 760w,
        ${name}-1140.jpg 1140w,
        ${name}-1520.jpg 1520w,
        ${name}-2280.jpg 2280w"
sizes="(min-width: 720px) 42rem,
       calc(100vw - 2rem)">`;
    });

    return {
        dir: {
            includes: "_includes",
            layouts: "_layouts"
        }
    }

};
