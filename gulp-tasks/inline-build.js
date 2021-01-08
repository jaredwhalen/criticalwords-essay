module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('build/index.html')
            .pipe(plugins.inline({
                base: 'build/'
            }))
            .pipe(gulp.dest('build/'));
    };
};
