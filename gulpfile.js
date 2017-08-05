var gulp = require('gulp');
var pug = require('gulp-pug');
var postcss = require('gulp-postcss');
var cssnested = require('postcss-nested');
var cssnext = require('postcss-cssnext');
var browserSync = require('browser-sync').create();

// Servidor base de desarrollo
gulp.task('server', function() {
  browserSync.init({
    server:{
      baseDir: './dist'
    }
  });
});

// Tarea para procesar PUG (jade)
gulp.task('jade', function () {
  return gulp.src('./src/views/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream())
});

// Tarea para procesar el CSS
gulp.task('css', function() {
  var procesos = [
    cssnested,
    cssnext({
      browsers:['>5%','ie8']
    })
  ];

  return gulp.src('./src/css/styles.css')
    .pipe(postcss(procesos))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
});

// Tarea para escuchar los cambios en los archivos css y pug
gulp.task('watch', function() {
  gulp.watch('./src/css/*.css', ['css']);
  gulp.watch('./src/views/**/*.pug', ['jade']);
});

// Lanza todas las tareas
gulp.task('default', ['watch','server']);