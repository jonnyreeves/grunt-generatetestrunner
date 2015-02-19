module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.loadTasks('./tasks');

    grunt.initConfig({
        'jshint': {
            all: {
                src: [ 'tasks/**/*.js', 'test/**/*.js', 'Gruntfile.js' ],
                options: {
                    jshintrc: '.jshintrc'
                }
            }
        },
        'clean': {
            build: 'build/**/*'
        },
        'generatetestrunner': {
            qunit: {
                options: {
                    runner: 'qunit',
                    dest: './build/tmp/qunit-runner.html',
                    srcLibs: [ 'main.js' ],
                    vendorLibs: [
                        'http://code.jquery.com/qunit/qunit-1.17.1.js',
                        'http://code.jquery.com/qunit/qunit-1.17.1.css'
                    ]
                }
            },
            mocha: {
                options: {
                    runner: 'mocha',
                    dest: './build/tmp/mocha-runner.html',
                    srcLibs: [ 'main.js' ],
                    vendorLibs: [
                        'https://cdnjs.cloudflare.com/ajax/libs/mocha/2.1.0/mocha.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/mocha/2.1.0/mocha.css'
                    ]
                }
            },
            custom: {
                options: {
                    template: './test/fixtures/custom.tpl',
                    dest: './build/tmp/custom-runner.html',
                    srcLibs: [ './test/fixtures/js/*.js' ],
                    data: {
                        greeting: 'Hello World!'
                    }
                }
            }
        },
        'nodeunit': {
            all: [ 'test/suite.js' ]
        }
    });

    grunt.registerTask('default', [ 'clean', 'jshint', 'generatetestrunner', 'nodeunit' ]);
};