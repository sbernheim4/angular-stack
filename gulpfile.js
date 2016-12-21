var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

gulp.task('generateCSS', function () {
	// the source file of the scss is a main file which just imports all the separate scss files
	return gulp.src('./browser/scss/index.scss')
	.pipe(sass().on('error', sass.logError)) // compile the sass file to a css file
	.pipe(cleanCSS()) // minify the css file
	.pipe(gulp.dest('./server/public/')); // write the css file to ./server
});

gulp.task('buildJS', function() {
	return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
	.pipe(sourcemaps.init())
	.pipe(concat('main.js'))
	.pipe(babel())
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./server/public'))
});


/* Watch files to have gulp tasks run automatically when saved */
gulp.task('watch', function() {
	gulp.watch('./browser/scss/*', ['generateCSS']);
	gulp.watch('./browser/js/**/*.js', ['buildJS']);
});

gulp.task('default', ['watch']);
