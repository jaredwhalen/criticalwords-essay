require('dotenv').config();
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var del = require('del');
var inquirer = require('inquirer');
var versionNumber;

const fs = require("fs");
const gutil = require('gutil');
const ftp = require('vinyl-ftp');

plugins.sass = require('gulp-sass');
plugins.gulpIf = require('gulp-if');
plugins.runSequence = require('run-sequence');
plugins.browserSync = require('browser-sync').create();
plugins.gutil = require('gulp-util');
plugins.inline = require('gulp-inline');
plugins.removeCode = require('gulp-remove-code');
plugins.htmlmin = require('gulp-htmlmin');

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

gulp.task('sass', getTask('sass'));
gulp.task('browserSync', getTask('browserSync'));
gulp.task('browserify', getTask('browserify'));
gulp.task('browserifyBuild', getTask('browserifybuild'));
gulp.task('clean', getTask('clean'));
gulp.task('nunjucks', getTask('nunjucks'));
gulp.task('nunjucks-build', getTask('nunjucks-build'));
gulp.task('useref', getTask('useref'));
gulp.task('useref-build', getTask('useref-build'));
gulp.task('useref-build2', getTask('useref-build2'));
gulp.task('indexcleanup', [
    'useref-build', 'inline'
], getTask('indexcleanup'));
gulp.task('sass-build', getTask('sass-build'));
gulp.task('inline', getTask('inline'));
gulp.task('inline-build', getTask('inline-build'));
gulp.task('buildtoolclean', [
    'useref-build2', 'inline-build'
], getTask('buildtoolclean'));

// gulp.task('inq', function(done) {
//     'use strict';
//     var questions = [
//         {
//             type: 'input',
//             name: 'version_number',
//             message: 'What is the # file version?'
//         }
//     ];
// (function(answers) {
//         done();
//     });
// })

gulp.task('setName', function() {
    var config = require("./project.json");
    var settings = require("./package.json");
    var name;

    if (config.projectName) {
        name = config.projectName;
    } else {
        name = settings.name;
    }
    return gulp.src("./build/index.html").pipe(rename(function(path) {
        path.basename = name;
        // path.basename += "-" + versionNumber;
        path.extname = ".html"
    })).pipe(gulp.dest("./build"));
})

gulp.task('delIndex', function() {
    return del.sync('build/index.html');
});
gulp.task('rename', function(callback) {
    plugins.runSequence('setName', 'delIndex', callback)
})

gulp.task('watch', [
    'browserSync', 'sass', 'nunjucks'
], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', ['nunjucks']);
    gulp.watch('app/js/**/*.js', ['browserify']);
    gulp.watch('app/js/**/*.html', ['browserify']);
    gulp.watch('app/js/**/*.json', ['browserify']);
    gulp.watch('app/data/**/*.json', ['browserify']);
});

gulp.task('default', function(callback) {
    plugins.runSequence([
        'sass', 'browserify', 'nunjucks', 'browserSync', 'watch'
    ], callback)
})

gulp.task('build', function(callback) {
    plugins.runSequence('clean', 'browserifyBuild', [
        'sass-build', 'nunjucks-build'
    ], 'useref-build', 'inline-build', 'indexcleanup', callback)
})

gulp.task('buildtool', function(callback) {
    plugins.runSequence('clean', 'browserifyBuild', [
        'sass-build', 'nunjucks-build'
    ], 'useref-build2', 'inline', 'buildtoolclean', callback)
})
