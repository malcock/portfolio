var gulp        = require('gulp');
var cache       = require('gulp-cache');
var gconcat     = require('gulp-concat');
var cleanCSS    = require('gulp-clean-css');
var gutil       = require('gulp-util');
var notify      = require('gulp-notify');
var plumber     = require('gulp-plumber');
var sass        = require('gulp-sass');
var pug         = require('gulp-pug');
var imagemin    = require('gulp-imagemin')
var sourcemaps  = require('gulp-sourcemaps');
var gls         = require('gulp-live-server');
var uglify      = require('gulp-uglify');
var beeper      = require('beeper');
var ftp         = require( 'vinyl-ftp' );

var fs = require('fs');
var ftp_auth = JSON.parse(fs.readFileSync('./config.json'));

var onError            = function(err) { // Custom error msg with beep sound and text color
    notify.onError({
      title:    "Gulp error in " + err.plugin,
      message:  err.toString()
    })(err);
    beeper(3);
    this.emit('end');
    gutil.log(gutil.colors.red(err));
};

gulp.task('build',function(){
    //css
    gulp.src('views/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build'));

    //js
    gulp.src('public/js/**/*.js')
    .pipe(gulp.dest('build/js'));
    //styles
    gulp.src('styles/main.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'));

    //images
    gulp.src('public/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true})))
    .pipe(gulp.dest('build/images/'));

});

gulp.task( 'deploy', function () {
    
       var conn = ftp.create( {
           host:     ftp_auth.host,
           user:     ftp_auth.user,
           password: ftp_auth.password,
           parallel: 10,
           log:      gutil.log
       } );
    
       var globs = [
           'build/**/*'
       ];
    
       // using base = '.' will transfer everything to /public_html correctly 
       // turn off buffering in gulp.src for best performance 
    
       return gulp.src( globs, { base: './build', buffer: false } )
           .pipe( conn.newer( '/public_html' ) ) // only upload newer files 
           .pipe( conn.dest( '/public_html' ) );
    
   } );


gulp.task('postinstall', function(){
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('public/js/lib'));

    gulp.src('./node_modules/chart.js/dist/chart.min.js')
    .pipe(gulp.dest('public/js/lib'));

    gulp.src('./node_modules/chartjs-plugin-deferred/dist/chartjs-plugin-deferred.min.js')
    .pipe(gulp.dest('public/js/lib'));

})

gulp.task('styles',function(){
    gulp.src('styles/main.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
})

gulp.task('scripts',function(){
    gulp.src('scripts/')
})

gulp.task('watch', function(){
    gulp.watch('styles/**/*.scss', ['styles']);
});

gulp.task('default', ['styles','watch'], function(){
    var server =  gls.new('./server.js');
    return server.start();
})
