'use strict';

var fs = require('fs');
var path = require('path');

function getActual(fixtureName) {
    var buildDir = path.join(__dirname, '..', 'build', 'tmp');
    return fs.readFileSync(path.join(buildDir, fixtureName)).toString();
}

function getExpected(fixtureName) {
    var expectedDir = path.join(__dirname, 'expected');
    return fs.readFileSync(path.join(expectedDir, fixtureName)).toString();
}

module.exports = {
    qunit: function (test) {
        test.equal(getActual('qunit-runner.html'), getExpected('qunit-runner.html'),
            'QUnit runner generated');

        test.done();
    },

    mocha: function (test) {
        test.equal(getActual('mocha-runner.html'), getExpected('mocha-runner.html'),
            'Mocha runner generated');

        test.done();
    },

    custom: function (test) {
        test.equal(getActual('custom-runner.html'), getExpected('custom-runner.html'),
            'Custom runner generated');

        test.done();
    }
};