# grunt-generatetestrunner v0.4.0

> Generate Test Runner HTML

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-generatetestrunner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-generatetestrunner');
```

## Generate Test Runner task
_Run this task with the `grunt generatetestrunner` command._

Task targets and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### dest
Type: `String`
default: `build/test-runner.html`

Where to write the generate html document.

#### runner
Type: `String`

The test framework to generate a template for, required if no template is supplied.

#### srcLibs
Type: `String` or `Array.<String>`

Path to one or more javascript files which make up your sources which will be tested.

#### vendorLibs
Type: `String` or `Array.<String>`

Path to one or more javascript and / or css files which need to be loaded before
your tests are executed; this will typically include the testing framework itself.

#### template
Type: `String`

Path to a custom template file to use, required if no runner is supplied.

#### data
Type: `Object`
default: `{ title: 'TestRunner' }`

Hash containing custom data to use when building the template.

### Usage Examples


##### Using a default template
This library provides default templates for `'qunit'` and `'mocha'`, you just need
to supply the path to your own sources and the testing frameworks sources.

```js
generatetestrunner: {
  main: {
    options: {
      // provide the path to your code which is under test.
      srcLibs: 'build/main.js',

      // provide the path to your testing framework, accepts js and css.
      vendorLibs: [ 'vendor/mocha*', 'vendor/chai*.js ]

      // generate a template for use with Mocha.
      runner: 'mocha',
    }
  }
}
```

##### Using a custom template
Template files can be marked up with grunt template tags (defaults to: `<%=` and `%>`)
which will be replaced with values present in the supplied `data` hash.

```js
generatetestrunner: {
  main: {
    options: {
      srcLibs: 'build/main.js',
      vendorLibs: 'test/my-framework.js',
      template: 'test/runner.tpl',
      data: {
        custom: 'values'
      }
    }
  }
}
```


