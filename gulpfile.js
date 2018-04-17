var gulp         = require('gulp');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var gutil        = require('gulp-util');
var babelify     = require('babelify');
var browserSync  = require('browser-sync').create();
var watchify     = require('watchify');
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app/public'
    },
    open: false,
    notify: false,
    reloadOnRestart: true,
    // online: true,
  })
});


gulp.task('browserify', function(){
  return browserify({ 
          entries: './app/src/js/App.js', 
          debug: true,
          cache: {},
          packageCache:{},
          plugin: [watchify] 
        })
	  .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./app/public/build'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass', function(){
	return gulp.src('app/src/scss/*.scss')
		.pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
		.pipe(gulp.dest('app/public/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('html', function(){
  return gulp.src('app/src/index.html')
    .pipe(gulp.dest('app/public'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
 

gulp.task('watch', 
  [ 'browserSync','sass', 'html', 'browserify'], 
  function (){
    gulp.watch('app/src/js/*.js', ['browserify']); 
    gulp.watch('app/src/*.html', ['html']); 
    gulp.watch('app/src/scss/*.scss', ['sass']); 
});
 
 gulp.task('default', ['watch']);
