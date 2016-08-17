const gulp = require('gulp');
var git = require('gulp-git');
const $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var buildBranch = require('gulp-build-branch');
var buildBranchName = 'dist';

gulp.task('publish', [
  'build',
  'buildBranch'
], function() {
  git.checkout(buildBranchName, err => {
    if (err)
      throw err;
    git.push('origin', buildBranchName, err => {
      if (err)
        throw err;
      git.checkout('master');
    });
  });
});

gulp.task('copy', function() {
  return gulp.src(['*.*','demo/**/*','test/**/*'], {base: '.'})
    .pipe(gulp.dest(buildBranchName));
});

gulp.task('buildBranch', function() {
  return buildBranch({
    folder: buildBranchName,
    branch: buildBranchName
  });
})

gulp.task('build', ['copy'], function() {
  return gulp.src(['dist/*.{html, js}'])
        .pipe($.sourcemaps.init())
        .pipe($.if('*.html', $.crisper({
          scriptInHead: false
        })))
        .pipe($.if('*.js', $.babel({
          presets: ['es2015']
        })))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(buildBranchName, {
          overwrite: true
        }));
});

gulp.task('serve', function() {
  browserSync.create();
  browserSync({
    logLevel: 'debug',
    logConnections: true,
    logSnippet: true,
    port: 5000,
    notify: true,
    server: {
      baseDir: ['./'],
      routes: {
        '/bower_components': 'app/bower_components'
      }
    }
  });
  gulp.watch([
    '**/*.html'
  ]).on('change', browserSync.reload);
});
