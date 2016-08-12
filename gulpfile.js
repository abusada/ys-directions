const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var buildBranch = require('gulp-build-branch');

gulp.task('publish', ['build'], function() {
  return buildBranch({
    folder: 'dist',
    branch: 'dist'
  });
});

gulp.task('copy', function () {
  return gulp
    .src(['./*', '!app'])
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copy'], function() {
  return gulp.src(['dist/*.html'])
    .pipe($.sourcemaps.init())
    .pipe($.if('*.html', $.crisper({
        scriptInHead: false
    })))
    .pipe($.if('*.js', $.babel({
        presets: ['es2015']
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist', {
      overwrite: true
    }));
});

gulp.task('serve', function() {
    browserSync.create();
    browserSync({
        logLevel: "debug",
        logConnections: true,
        logSnippet: true,
        port: 5000,
        notify: true,
        server: {
            baseDir: ['./'],
            routes: {
                "/bower_components": "app/bower_components"
            }
        }
    });
    gulp.watch([
        '**/*.html'
    ]).on('change', browserSync.reload);
});
