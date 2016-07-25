var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

// css
gulp.task('css', function() {
	gulp.src('src/styles/main.css')
		.pipe(autoprefixer({compress: false, paths:['style']}))
		.pipe(minifyCSS())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
});
// html
gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
});
// js
gulp.task('js', function() {
	gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'bower_components/modernizr/modernizr.js'
		])
		.pipe(concat('output.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
});

gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true,
	});
});

gulp.task('watch', function() {
	gulp.watch('src/styles/*.css', ['css']);
	gulp.watch('src/*.html', ['html']);
});

gulp.task('default', ['css', 'html', 'js']);
gulp.task('start', ['connect', 'watch']);

