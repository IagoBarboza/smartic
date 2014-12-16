var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    notify = require('gulp-notify')

gulp.task('sass', function () {
    // create css using sass and place in the css directory
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('src/css/'))
        .pipe(notify("sass finished!"));
});

gulp.task('lint', function () {
    // check js and report errors
    gulp.src('src/**.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch-sass', function () {
    // watch when .scss files change, and run task 'sass'
    gulp.watch(['src/scss/*.scss'], ['sass']);
});

gulp.task('watch-js', function () {
    // watch when .scss files change, and run task 'sass'
    gulp.watch(['src/**/*.js'], ['lint']);
});

// default task
gulp.task('default', ['sass', 'lint', 'watch-js','watch-sass']);