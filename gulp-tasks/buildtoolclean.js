var del = require('del');

module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('pasteInTool/index.html')
            .pipe(plugins.removeCode({
                build: true
            }))
            .pipe(plugins.gulpIf('*.html', plugins.htmlmin({
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                preserveLineBreaks: true,
                removeComments: true
            })))
            .pipe(gulp.dest('pasteInTool'))

        del.sync('pasteInTool/main.min.js');
        del.sync('pasteInTool/styles.min.css');
    };
};
