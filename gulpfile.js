var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

gulp.task('buildCSS', function () {
	// the source file of the scss is a main file which just imports all the separate scss files
	return gulp.src('./browser/scss/index.scss')
	.pipe(sass().on('error', sass.logError)) // compile the sass file to a css file
	.pipe(cleanCSS()) // minify the css file
	.pipe(gulp.dest('./server/public/')); // write the css file to ./server
});

gulp.task('buildJS', function() {
	// run this for .js files for all folders in browser/js/ for all js files in them
	return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
	.pipe(sourcemaps.init()) // use sourcemaps
	.pipe(concat('main.js')) // write all the files to a single file called main.js
	.pipe(babel()) // run babel to use ES6 syntax
	.pipe(ngAnnotate()) // not quite sure what this does
	.pipe(uglify()) // minify the js
	.pipe(sourcemaps.write('./')) // write the source map
	.pipe(gulp.dest('./server/public')) // write the result of this to ./server/public
});


/* Watch files to have gulp tasks run automatically when saved */
gulp.task('watch', function() {
	gulp.watch('./browser/scss/*', ['buildCSS']);
	gulp.watch('./browser/js/**/*.js', ['buildJS']);
});

