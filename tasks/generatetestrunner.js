'use strict';

var path = require('path');
var assert = require('assert');
var xtend = require('xtend');
var fs = require('fs');

var createTag = require('./util/createTag');
var getRelativePath = require('./util/getRelativePath');
var normaliseSrc = require('./util/normaliseSrc');

module.exports = function (grunt) {
    grunt.registerMultiTask('generatetestrunner',
        'generates a test-runner html from a template', function () {

            function getTemplateContents(file) {
                if (!grunt.file.isFile(file)) {
                    grunt.fail.fatal('Expected testrunner template: ' + file);
                }
                return grunt.file.read(file);
            }

            function getRunnerTemplatePath(runner) {
                var filename = runner + '.tpl';
                return path.join(__dirname, '..', 'templates', filename);
            }

            function getTestRunnerTemplate() {
                var file = options.template || getRunnerTemplatePath(options.runner);
                return getTemplateContents(file);
            }

            function getTags(sources) {
                var destDir = path.dirname(options.dest);
                var toRelativePath = getRelativePath.bind(null, destDir);

                var expandGlobs = function (value) {
                    var matches = grunt.file.expand(value);
                    if (matches.length === 0) {
                        matches = [ value ];
                    }
                    return matches;
                };

                function flatten(soFar, value) {
                    return soFar.concat(value);
                }

                return sources
                    .map(expandGlobs)
                    .reduce(flatten, [])
                    .map(toRelativePath)
                    .map(createTag)
                    .join("\n");
            }

            var options = this.options({
                runner: 'qunit',
                dest: 'build/tmp/test-runner.html',
                data: {},
                template: '',
                srcLibs: '',
                vendorLibs: ''
            });

            // Supply a default title.
            if (!options.data.title) {
                options.data.title = 'Test Runner';
            }

            var runnerTemplate = getTestRunnerTemplate();

            var templateData = xtend(options.data, {
                src_tags: getTags(normaliseSrc(options.srcLibs)),
                vendor_tags: getTags(normaliseSrc(options.vendorLibs))
            });

            var output = grunt.template.process(runnerTemplate, { data: templateData });

            grunt.file.write(options.dest, output);
            grunt.log.ok("Test Runner: file://" + path.resolve(options.dest));
        });
};