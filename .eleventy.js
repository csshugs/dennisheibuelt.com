const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);

    return {
        dir: {
            includes: "_includes",
            layouts: "_layouts"
        }
    }

};
