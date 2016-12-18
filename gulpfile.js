var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

gulp.task('generateCSS', function () {
	// the source file of the scss is a main file which just imports all the separate scss files
	return gulp.src('./browser/scss/index.scss')
	.pipe(sass().on('error', sass.logError)) // compile the sass file to a css file
	.pipe(cleanCSS()) // minify the css file
	.pipe(gulp.dest('./server/public')); // write the css file to ./server
});

/* Watch files to have gulp tasks run automatically when saved */
gulp.task('watch', function() {
	gulp.watch('./browser/scss/*', ['generateCSS']);
});

gulp.task('default', ['watch']);
