'use strict';

var path = require('path');

function getRelativePath(from, to) {
    var result;
    if (to.match(/^[\w]+:\/\//)) {
        result = to;
    }
    else {
        result = path.relative(from, to).replace(/\\/g,"/");
    }
    return result;
}

module.exports = getRelativePath;