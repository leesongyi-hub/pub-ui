const gulp = require('gulp');
const prettify = require('gulp-prettify');
const fileinclude = require('gulp-file-include');
const injectString = require('gulp-inject-string');
const tap = require('gulp-tap');

gulp.task('fileinclude', function() {
  return gulp.src([
    "src/guide/views/**/*.html",
    "!" + "src/guide/views/include/**/*.html" // 이 부분을 제외하고 있습니다.
  ])
  .pipe(fileinclude({
    prefix: '@@',
    basepath: 'src/guide/views'
  }))
  .pipe(gulp.dest('src/guide/dist'));
});

gulp.task('compileIncludeFiles', function() {
  return gulp.src("src/guide/views/include/**/*.html")
});

gulp.task('injectString', function() {
  return gulp.src('src/guide/dist/**/*.html')
    .pipe(tap((file) => {
      const indentation = file.contents.toString().match(/^\s*/)[0];
      file.contents = Buffer.from(indentation + file.contents.toString());
    }))
    .pipe(gulp.dest('src/guide/dist'));
});

gulp.task('prettify', function() {
  return gulp.src('src/guide/dist/**/*.html')
    .pipe(prettify({
        indent_size: 2
    }))
    .pipe(gulp.dest('src/guide/dist'));
});

gulp.task('watch', () => {
  gulp.watch('src/guide/views/**/*.html',
  gulp.series('fileinclude', 'compileIncludeFiles', 'prettify',));
});

gulp.task('default', gulp.parallel('fileinclude', 'compileIncludeFiles', 'prettify', 'watch',));
