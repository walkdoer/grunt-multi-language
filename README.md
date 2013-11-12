# grunt-multi-language

> grunt multi language tool

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-multi-language --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-multi-language');
```

## The "multi_language" task

### Overview
In your project's Gruntfile, add a section named `multi_language` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  multi_language: {
    translate: {
      resources: 'test/lang/',
      options: {
        tag: '{{ }}',
        src: 'test/fixtures/test.html',
        dest: 'tmp'
      }
    }
  },
})
```

### Options

#### options.tag
Type: `String`
Default value: `'{{ }}  '`

语言包中使用的标签 例如 {{lang-to-translate}} ,如果默认的标签和文件中的其他标签的产生冲突，只需要覆盖默认配置即可,例如 "(| |)"

#### options.src
Type: `String`
Default value: `'.'`

需要翻译的源文件

### Usage Examples

```js
grunt.initConfig({
  multi_language: {
    translate: {
      resources: 'test/lang/',
      options: {
        tag: '{{ }}',
        src: 'test/fixtures/test.html',
        dest: 'tmp'
      }
    }
  },
})
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
