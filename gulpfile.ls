require! gulp
require! 'gulp-exec'
{protractor, webdriver} = require 'gulp-protractor'

gulp.task 'test' <[test:karma test:protractor]> !->

gulp.task 'test:karma' !->
  gulp.src 'package.json'
    .pipe gulp-exec 'node_modules/karma/bin/karma start --single-run --browsers PhantomJS test/karma.conf.ls'
    .on 'error' !-> throw it

gulp.task 'test:protractor' !->
  gulp.src 'package.json'
    .pipe protractor { configFile: 'test/protractor.conf.ls' }
    .on 'error' !-> throw it
