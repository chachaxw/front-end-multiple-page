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

// Gulp tasks
gulp.task('clean', (cb) => $.del(['build/**/*'], cb));

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

gulp.task('js', () => {
  $.fancyLog("-> Compiling js: " + pkg.paths.src.js);
  return gulp.src(pkg.globs.js)
    .pipe($.changed(pkg.paths.build.js))
    .pipe($.webpackStream(webpackConfig))
    .pipe(gulp.dest(pkg.paths.build.js));
});

gulp.task('html', () => {
  return gulp.src(pkg.globs.views)
    .pipe(gulp.dest(pkg.paths.build.views));
});

gulp.task('start', () => {
  $.runSequence('sass', 'html', () => {
    browserSync.init({
      server: { baseDir: pkg.paths.src.base }
    });
  });
});

// Watch files
watch(pkg.globs.sass).on('change', (event) => {
  $.runSequence('sass', () => browserSync.reload());
});
watch(pkg.globs.views).on('change', () => {
  $.runSequence('html', () => browserSync.reload());
});

// Error handler
function onError() {
  console.log('Error happened');
}
