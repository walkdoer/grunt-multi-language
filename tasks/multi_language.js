/*
 * grunt-multi-language
 * https://github.com/zhangmhao/grunt-multi-language
 *
 * Copyright (c) 2013 zhangmhao
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('multi_language', 'grunt multi language tool', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    //grunt.log.writeln(this.target + ': ' + JSON.stringify(this.data));
    var options = this.options({
      tag: '{{ }}',
    });

    var data = this.data,
        tagTmpArray = options.tag.split(' '),
        tagOpen = tagTmpArray[0],
        tagClose = tagTmpArray[1],
        //dest file path
        srcPath = options.src,
        srcInfo = srcPath.split('/'),
        //dest file name
        srcFileName = srcInfo[srcInfo.length - 1],
        destPath = options.dest,
        languageFilePath = data.resources;
    destPath += destPath.lastIndexOf('/') === destPath.length + 1 ? '' : '/';
    if (!languageFilePath) {
      grunt.log.warn('the language resources is not config for the target');
      return;
    }
    /**
     * get a new file name for the translated file
     * @param  {String}      srcfileName                      index.html
     * @return {String}      srcfileNameContent.langName.ext  index.en.html or index.cn.html
     */
    function getFileNameWithLangTAg(srcfileName, langName) {
      var pos = srcfileName.lastIndexOf('.');
      return srcfileName.substring(0, pos + 1) + langName + srcfileName.substring(pos);
    }
    //取出需要翻译的文件
    var fileContent = grunt.file.read(srcPath);

    //取出语言包文件夹
    grunt.file.recurse(languageFilePath, function callback(abspath, rootdir, subdir, filename) {
      var translateContent = fileContent,
          fileInfo = filename.split('.'),
          langName = fileInfo[0],
          newFileName = getFileNameWithLangTAg(srcFileName, langName),
          destFileFullPath = [destPath, newFileName].join('');
      try {
        //取出语言包对象
        var langObject = grunt.file.readJSON(abspath),
            langKey,
            langValue,
            replaceRegExp;

        for(langKey in langObject) {
          replaceRegExp = new RegExp([tagOpen, langKey, tagClose].join(''), 'g');
          langValue = langObject[langKey];
          if (typeof langValue === 'string') {
            translateContent = translateContent.replace(replaceRegExp, langObject[langKey]);
          } else {
            grunt.log.warn("can't translate language key:" + langKey);
          }
        }
      } catch (e) {
        grunt.log.error('something is wrong when translate file ' + abspath + ' please check your language resources file. Exception Message:' + e.message);
      }
      grunt.file.write(destFileFullPath, translateContent);
      grunt.log.writeln('File "' +  destFileFullPath + '" created.');
    });
  });

};