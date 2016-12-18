var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compileSass', function () {
	return gulp.src('./browser/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('browser/css'));
});

/* Watch files to have gulp tasks run automatically when saved */
gulp.task('watch', function() {
	gulp.watch('./browser/scss/*', ['compileSass']);
});

gulp.task('default', ['watch']);
