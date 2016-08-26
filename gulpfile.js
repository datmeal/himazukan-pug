var gulp = require('gulp');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch('pug/**/*.pug', ['views']);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('views', function buildHTML() {
  return gulp.src('pug/**/*.pug')
  .pipe(pug({
     // Your options in here.
   }))
   .pipe(gulp.dest("./app/"))
});

gulp.task('watch', function () {
   gulp.watch('pug/**/*.pug', ['views']);
});
