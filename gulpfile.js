const gulp = require('gulp');
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
  $.fancyLog("-> Compiling scss: " + pkg.paths.src.sass + pkg.vars.scssName);
  return gulp.src(pkg.paths.src.sass + pkg.vars.scssName)
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

gulp.task('html', () => {
  return gulp.src(pkg.paths.src.views)
    .pipe($.replace())
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
