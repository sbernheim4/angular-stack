const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const ngAnnotate = require('gulp-ng-annotate');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
/* NOTE: This requires a chrome extention to work properly:
	https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
*/
const livereload = require('gulp-livereload');

gulp.task('buildCSS', function () {
	// The source scss file is a main file which just imports all the separate scss files
	return gulp.src('./browser/scss/index.scss')
	.pipe(sass().on('error', sass.logError)) // compile the sass file to a css file
	.pipe(cleanCSS()) // minify the css file
	.pipe(gulp.dest('./server/public/')) // write the css file to ./server
	.pipe(livereload()); // reload browser automatically
});

gulp.task('buildJS', function() {
	return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
	.pipe(sourcemaps.init()) // use sourcemaps
	.pipe(concat('main.js')) // write all the files to a single file called main.js
	.pipe(babel()) // run babel to use ES6 syntax
	.pipe(ngAnnotate()) // not quite sure what this does
	.pipe(uglify()) // minify the js
	.pipe(sourcemaps.write('./')) // write the source map
	.pipe(gulp.dest('./server/public')) // write the result of this to ./server/public
	.pipe(livereload()); // reload browser automatically
});

gulp.task('buildHTML', function() {
	// Need the .template.html since using just .html would then create a new
	// file on each save
	return gulp.src('./browser/js/**/*.template.html')
	.pipe(htmlmin(
		{
			collapseWhitespace: true, // remove whitespace
			removeComments: true      // remove comments
		}))
	.pipe(rename(function(path) {
		path.extname = '.min.html' // change file extention from .html to .min.html
	}))
	.pipe(gulp.dest('./browser/js'))
	.pipe(livereload()); // reload browser automatically
})

/* Watch files to have gulp tasks run automatically when saved */
gulp.task('watch', function() {
	livereload.listen(); // reload browser automatically on save
	gulp.watch('./browser/scss/*', ['buildCSS']);
	gulp.watch('./browser/js/**/*.js', ['buildJS']);
	gulp.watch('./browser/js/**/*.html', ['buildHTML'])
});

/*
 * Defualt gulp task when `gulp` is run from the cli
 *
 * Run buildCSS and buildJS so the app is built/updated without requiring a save
 * in one of the watched files to run the same tasks
 */
gulp.task('default', ['buildHTML', 'buildCSS', 'buildJS', 'watch']);
