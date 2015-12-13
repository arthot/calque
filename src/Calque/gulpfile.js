/// <binding BeforeBuild='less' />
var gulp = require('gulp'),
    bom = require('gulp-bom'),
    less = require('gulp-less');

gulp.task('less', function () {
    return gulp.src('./styles/**/*.less')
      .pipe(less())
      .pipe(bom())
      .pipe(gulp.dest('./styles/'));
});

gulp.task('bom', function () {
    return gulp.src(['./bower_components/**/*.css', './bower_components/**/*.js'])
      .pipe(bom())
      .pipe(gulp.dest('./bower_components/'));
});