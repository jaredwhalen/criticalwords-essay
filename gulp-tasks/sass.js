var sass = require('gulp-sass');

module.exports = function (gulp, plugins) {
      return function () {
         return gulp.src(['app/scss/styles.scss','app/scss/philly-styles/phillystyles.scss']) // Gets all files ending with .scss in app/scss
           .pipe(sass())
           .pipe(gulp.dest('.tmp/css'))
           .pipe(plugins.browserSync.reload({
             stream: true
           }))
      };
  };
