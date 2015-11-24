/// <binding BeforeBuild='less' ProjectOpened='bower' />
var gulp = require('gulp'),
    less = require('gulp-less'),
    bower = require('gulp-bower');

gulp.task('less', function () {
    return gulp.src('./styles/**/*.less')
      .pipe(less())
      .pipe(gulp.dest('./styles/'));
});

gulp.task('bower', function () {
    return bower()
      .pipe(gulp.dest('bower_components/'))
});