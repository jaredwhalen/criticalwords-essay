var del = require('del');

module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('build/index.html')
            .pipe(plugins.removeCode({
                production: true
            }))
            .pipe(plugins.gulpIf('*.html', plugins.htmlmin({
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                preserveLineBreaks: true,
                removeComments: true
            })))
            .pipe(gulp.dest('build'))
        del.sync('build/main.min.js');
        del.sync('build/styles.min.css');

    };
};
