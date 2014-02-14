require! gulp
require! 'gulp-exec'

gulp.task 'test' <[test:karma]> ->

gulp.task 'test:karma' ->
  gulp.src('package.json')
    .pipe gulp-exec 'node_modules/karma/bin/karma start --single-run --browsers PhantomJS test/karma.conf.ls'
    .on 'error' ->
      throw it
