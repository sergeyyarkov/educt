"use strict";
var helloResolver = {
    Query: {
        hello: function () { return 'Hello world!'; },
    },
};
module.exports = helloResolver;
