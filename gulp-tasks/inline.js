module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('pasteInTool/index.html')
            .pipe(plugins.inline({
                base: 'pasteInTool/'
            }))
            .pipe(gulp.dest('pasteInTool/'));
    };
};
