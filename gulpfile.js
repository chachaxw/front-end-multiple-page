const gulp = require('gulp');
const webpackConfig = require('./webpack.config');
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});
const browserSync = $.browserSync.create();
const watch = $.watch;

// package vars
const pkg = require('./package.json');

// Gulp dev tasks
gulp.task('sass', () => {
  $.fancyLog("-> Compiling sass: " + pkg.paths.src.sass);
  return gulp.src(pkg.globs.sass)
    .pipe($.changed(pkg.paths.build.css))
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sourcemaps.init())
    .pipe($.sass({ includePaths: pkg.paths.scss})
    .on('error', $.sass.logError))
    .pipe($.cached('sass_compile'))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(pkg.paths.src.css));
});

gulp.task('img', () => {
	return gulp.src(pkg.globs.img)
	  .pipe(gulp.dest(pkg.paths.build.img));
});

gulp.task('js', () => {
  copyFile(pkg.globs.distJs, pkg.paths.build.js+'lib/');
  $.fancyLog("-> Compiling js: " + pkg.paths.src.js);
  compileJS(pkg.globs.js);
});

gulp.task('html', () => {
  return gulp.src(pkg.globs.views)
    .pipe(gulp.dest(pkg.paths.build.views));
});

gulp.task('start', () => {
  $.runSequence('sass', 'js', 'html', () => {
    browserSync.init({
      server: { baseDir: pkg.paths.src.base }
    });
  });
});

gulp.task('clean', (cb) => $.del(['build/**/*'], cb));

// Watch files
watch(pkg.globs.img).on('change', (event) => {
  $.runSequence('sass', () => browserSync.reload());
});
watch(pkg.globs.sass).on('change', (event) => {
  $.runSequence('sass', () => browserSync.reload());
});
watch(pkg.globs.views).on('change', () => {
  $.runSequence('html', () => browserSync.reload());
});
watch(pkg.globs.js).on('change', () => {
  $.runSequence('js', () => browserSync.reload());
});
watch(pkg.globs.components, (event) => {
	const pathType = event.path.indexOf('\\') > -1 ? '\\' : '/';
	const business = event.path.split(pathType).slice(-2);
	const jsFile   = business[1].split('-')[0];
	let path;

	if (business[0] === 'common') {
		path = pkg.globs.js;
	} else if (business[0] === jsFile) {
		path = pkg.paths.src.js+ business[0] +'/*.js';
	} else {
		path = pkg.paths.src.js + business[0] + '/' + jsFile + '.js';
	}
  console.log('path:', path,'business:', business);
  compileJS(path);
});

// Compile JS
function compileJS(path, dest) {
  dest = dest || pkg.paths.build.base;
  return gulp.src(path)
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.vinylNamed((file) => renamedFile(file)))
    .pipe($.webpackStream(webpackConfig))
    .pipe($.cached('js_compile'))
    .pipe($.browserSync.reload({ stream: true }))
    .pipe(gulp.dest(dest));
}

// Rename files
function renamedFile(file) {
  const path = JSON.parse(JSON.stringify(file)).history[0];
  const pathType = path.indexOf('\\') > -1 ? '\\js\\' : '/js/';
  const target = path.split(pathType)[1];
  return target.substring(0, target.length - 3);
}

// Copy files
function copyFile(from, to) {
  gulp.src(from).pipe(gulp.dest(to));
}

// Error handler
function onError() {
  $.fancyLog("Error happened");
}
