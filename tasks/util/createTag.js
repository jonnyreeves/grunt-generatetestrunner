'use strict';

function getTagType(value) {
    var result = '';

    if (value.match(/\.js$/i)) {
        result = 'script';
    }
    else if (value.match(/\.css$/i)) {
        result = 'link';
    }

    return result;
}

function createTag(uri) {
    var result = '';
    var type = getTagType(uri);

    if (type === 'link') {
        result = '<link rel="stylesheet" href="' + uri + '" />';
    }
    else if (type === 'script') {
        result = '<script src="' + uri + '"></script>';
    }
    else {
        result = '<-- Unhandled file extension: ' + uri + ' -->';
    }

    return result;
}

module.exports = createTag;