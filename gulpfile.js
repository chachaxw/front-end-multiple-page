const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});
const browserSync = $.browserSync.create();
const watch = $.watch;

// package vars
const pkg = require('./package.json');

// scss - build the scss to the build folder,
// including the required paths, and writing out a sourcemap
gulp.task('sass', () => {
  $.fancyLog("-> Compiling scss: " + pkg.paths.src.sass + pkg.vars.scssName);
  return watch(pkg.globs.sass, () => {
    gulp.src(pkg.paths.src.sass + pkg.vars.scssName)
      .pipe($.plumber({ errorHandler: onError }))
      .pipe($.sourcemaps.init())
      .pipe($.sass({ includePaths: pkg.paths.scss})
      .on('error', $.sass.logError))
      .pipe($.cached('sass_compile'))
      .pipe($.autoprefixer())
      .pipe($.sourcemaps.write('./'))
      .pipe($.size({ gzip: true, showFiles: true }))
      .pipe(gulp.dest(pkg.paths.src.css));
  });
});

// Error handler
function onError() {
  console.log('Error happened');
}
