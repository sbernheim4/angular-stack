const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const purify = require('gulp-purifycss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const ngAnnotate = require('gulp-ng-annotate');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');
const chalk = require('chalk');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

/**********************************************************/

/* Production Builds */
gulp.task('buildCSSProduction', () => {
	return gulp.src('./browser/scss/index.scss')
	.pipe(sass().on('error', sass.logError)) // compile the sass file to a css file
	.pipe(purify(['./browser/js/**/*.min.html'])) // Remove unused css --> Must be before autoprefixer since that adds in a lot of extra CSS that might not be used
	.pipe(postcss([autoprefixer({browsers: ['> 1%']})]))
	.pipe(cleanCSS()) // minify the css file
	.pipe(gulp.dest('./server/public/')) // write the css file to ./server
});

gulp.task('buildJSProduction', () => {
	return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
	.pipe(sourcemaps.init()) // use sourcemaps
	.pipe(concat('main.js')) // write all the files to a single file called main.js
	.pipe(babel()) // run babel to use ES6 syntax
	.pipe(ngAnnotate()) // not quite sure what this does
	.pipe(uglify()) // minify the js
	.pipe(sourcemaps.write('./')) // write the source map
	.pipe(gulp.dest('./server/public')) // write the result of this to ./server/public
});

gulp.task('buildHTMLProduction', () => {
	return gulp.src('./browser/js/**/*.template.html')
	.pipe(htmlmin({collapseWhitespace: true, removecomments: true}))
	.pipe(rename(function(path) {
		path.extname = '.min.html' // change file extention from .html to .min.html
	}))
	.pipe(gulp.dest('./browser/js'))
});

gulp.task('buildProduction', ['buildHTMLProduction', 'buildCSSProduction', 'buildJSProduction'], function () { buildDone(); });

gulp.task('lintJS', () => {
	return gulp.src('./browser/js/**/*.js')
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task('lintCSS', () => {
	return gulp.src('./browser/scss/*.scss')
	.pipe(gulpStylelint({
		reporters: [
			{formatter: 'string', console: true}
		]
	}));
});

gulp.task('lint', () => {
	printLint();
	gulp.start('lintJS');
	gulp.start('lintCSS');
})
/**********************************************************/
/* Development Builds */

gulp.task('buildCSS', () => {
	// The source scss file is a main file which just imports all the separate scss files
	return gulp.src('./browser/scss/index.scss')
	.pipe(sass().on('error', sass.logError)) // compile the sass file to a css file
	.pipe(cleanCSS()) // minify the css file
	.pipe(gulp.dest('./server/public/')) // write the css file to ./server
	.pipe(browserSync.stream());
});

gulp.task('buildJS', () => {
	return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
	.pipe(concat('main.js')) // write all the files to a single file called main.js
	.pipe(babel()) // run babel to use ES6 syntax
	.pipe(gulp.dest('./server/public')) // write the result of this to ./server/public
	.pipe(browserSync.stream());
});

gulp.task('buildHTML', () => {
	// Need the .template.html since using just .html would then create a new
	// file on each save
	return gulp.src('./browser/js/**/*.template.html')
	.pipe(htmlmin(
		{
			removeComments: true      // remove comments
		}))
		.pipe(rename( (path) => {
			path.extname = '.min.html' // change file extention from .html to .min.html
		}))
		.pipe(gulp.dest('./browser/js'))
	.pipe(browserSync.stream());
		/*.pipe(livereload()); // reload browser automatically*/
})

gulp.task('browser-sync', () => {
	browserSync.init({
		proxy: `localhost:1337`,  // local node app address --> Confgirued in ./server/index.js
		port: 5000  // use *different* port than above --> Use this port for the actual url in the browser
		/*notify: true*/
	});
});

/* Watch files to have gulp tasks run automatically when saved */
gulp.task('watch', () => {
	gulp.watch('./browser/scss/*', ['buildCSS', 'lintCSS']);
	gulp.watch('./browser/js/**/*.js', ['buildJS', 'lintJS'])
	gulp.watch('./browser/js/**/*.html', ['buildHTML']);
});

/*
 * Defualt gulp task when `gulp` is run from the cli
 *
 * Run buildCSS and buildJS so the app is built/updated without requiring a save
 * in one of the watched files to run the same tasks
 */
gulp.task('default', ['browser-sync', 'buildHTML', 'buildCSS', 'buildJS', 'watch', 'lint']);

function buildDone() {
	console.log(chalk.green.bold(`
	 o==================================================o
	 |        o---o   o    o  o  o       o--o           |
	 |        |   |   |    |  |  |       |   \\          |
	 |        o---o   |    |  |  |       |    o         |
	 |        |    \\  |    |  |  |       |   \/          |
	 |        o----o  o----o  o  o----o  o--o           |
	 |                                                  |
	 |         o--o   o-----o  o   o  o---o             |
	 |         |   \\  |     |  |\\  |  |                 |
	 |         |    o |     |  | \\ |  |---o             |
	 |         |   \/  |     |  |  \\|  |                 |
	 |         o--o   o-----o  o   o  o---o             |
	 o==================================================o
 `));

}

function printLint() {
	console.log(chalk.green.bold(`
	 o=====================================================o
	 |    o      o  o   o  o-----o  o  o   o    o----o     |
	 |    |      |  |\\  |     |     |  |\\  |  \/            |
	 |    |      |  | \\ |     |     |  | \\ | o    o---o    |
	 |    |      |  |  \\|     |     |  |  \\|  \\     |      |
	 |    o---o  o  o   o     o     o  o   o   o----o      |
	 o=====================================================o
	 `));
};

