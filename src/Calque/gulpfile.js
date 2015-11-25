/// <binding BeforeBuild='less' />
var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('less', function () {
    return gulp.src('./styles/**/*.less')
      .pipe(less())
      .pipe(gulp.dest('./styles/'));
});