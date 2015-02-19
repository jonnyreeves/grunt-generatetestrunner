'use strict';

function normaliseSrc(value) {
    var result = [];
    if (value) {
        result = Array.isArray(value) ? value : [ value ];
    }
    return result;
}

module.exports = normaliseSrc;