var browserify = require('browserify');
var source = require('vinyl-source-stream');
var stringify = require('stringify');
var buffer = require('vinyl-buffer');
var babelify = require("babelify");
var uglify = require('gulp-uglify');


module.exports = function(gulp, plugins) {
    return function() {
         return browserify({
                'entries': ['app/js/main.js']
            })
            .transform(stringify, {
                appliesTo: {
                    includeExtensions: ['.html']
                }
            })
            .transform(babelify, {
                presets: ["env"]
            })
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(uglify({
                mangle: false,
                compress: false
            }).on('error', plugins.gutil.log))
            .pipe(gulp.dest('.tmp/js'))
    };
};
