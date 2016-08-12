const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var buildBranch = require('gulp-build-branch');
var git = require('gulp-git');
var buildBranchName = 'dist';

gulp.task('publish', ['build', 'buildBranch'], function() {
    git.checkout(buildBranchName, function(err) {
        if (err)
          throw err;
        else git.push('origin', buildBranchName, function(err) {
            if (err) throw err;
        });
    });
});


gulp.task('copy', function() {
    return gulp
        .src(['./*', '!app'])
        .pipe(gulp.dest('dist'));
});

gulp.task('buildBranch', function() {
    return buildBranch({
        folder: buildBranchName,
        branch: buildBranchName
    });
})

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
