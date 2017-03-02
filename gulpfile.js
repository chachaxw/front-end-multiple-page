const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});
// console.log($);

// package vars
const pkg = require('./package.json');

// scss - build the scss to the build folder,
// including the required paths, and writing out a sourcemap
gulp.task('scss', () => {
  $.fancyLog("-> Compiling scss: " + pkg.paths.build.css + pkg.vars.scssName);
  return gulp.src(pkg.paths.src.scss + pkg.vars.scssName)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        includePaths: pkg.paths.scss
      })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.cached('sass_compile'))
    .pipe($.sourcemaps.write('./'))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(pkg.paths.build.css));
})
