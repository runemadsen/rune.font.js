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
var shim = require('browserify-shim');

// Transpile
// -------------------------------------------------

function transpile(infiles, outfile, outdir, extraOpts, useShim) {

  var opts = assign({}, extraOpts);
  var bundler = browserify(infiles, opts)
    .transform(babelify.configure({sourceMaps:false}))

  if(useShim) bundler.transform(shim);

  return bundler.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source(outfile))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(outdir));
}

// Build a browserified version that includes opentype, but ignores
// rune.js (as it should be on the page already), and shims the require.
gulp.task('build:browser', function() {
  return transpile('./src/font.js', 'font.browser.js', 'tmp', {
    standalone: "Rune.Font",
    ignore:"rune.js",
    debug:true
  }, true)
});

// Build a node version with no bundled packages.
gulp.task('build:node', function() {
  return transpile('./src/font.js', 'font.node.js', 'tmp', {
    bundleExternal:false,
    standalone: "Rune.Font",
    debug:true
  })
});

gulp.task('test:browser', ['build:browser'], function() {
  return gulp.src([
    'node_modules/rune.js/dist/rune.browser.js',
    'tmp/font.browser.js',
    'test/specs.js'
  ])
  .pipe(jasmineBrowser.specRunner())
  .pipe(jasmineBrowser.server({port: 8888}));
});

gulp.task('specs:node', function() {
  return gulp.src([
    'test/init_node.js',
    'test/matchers.js',
    'test/specs.js'
  ])
  .pipe(concat('font_node_specs.js'))
  .pipe(gulp.dest('tmp'));
});

gulp.task("test:node", ['build:node', 'specs:node'], function() {
  return gulp.src(['tmp/font_node_specs.js']).pipe(jasmine({verbose: true, includeStackTrace:true}));
});