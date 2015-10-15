var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var rename = require("gulp-rename");
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var zip = require('gulp-zip');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var concat = require('gulp-concat');
var jasmine = require('gulp-jasmine');
var jasmineBrowser = require('gulp-jasmine-browser');

// Transpile
// -------------------------------------------------

function transpile(infiles, outfile, outdir, extraOpts) {

  var opts = assign({}, extraOpts);
  var bundler = browserify(infiles, opts)
    .transform(babelify.configure({sourceMaps:false}));

  return bundler.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source(outfile))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(outdir));
}

gulp.task('build:browser', function() {
  return transpile('./src/font.js', 'font.browser.js', 'tmp', { standalone: "Rune.Font", ignore:"rune.js", debug:true })
});

gulp.task('test:browser', ['build:browser'], function() {
  return gulp.src([
    // We run the rune.browser.js file for browser tests.
    // We might want to include this file in the npm package
    // so I don't need to copy/paste it.
    'test/lib/rune.browser.js',
    'tmp/font.browser.js',
    'test/specs.js'
  ])
  .pipe(jasmineBrowser.specRunner())
  .pipe(jasmineBrowser.server({port: 8888}));
});