module.exports = function (gulp, plugins) {
    return function () {
      plugins.browserSync.init({
         open: false,
         ghostMode: false,
        server: {
          baseDir: '.tmp'
        },
      })
    }
};
