const PROJECT_NAME = 'wysiwyg';
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

// Script works
// Concat
// Uglify
gulp.task('scripts', function(){
	gulp.src('js/*.js')
	.pipe(concat(PROJECT_NAME + '.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});

// Style works
// Concat
gulp.task('styles', function(){
	gulp.src('css/*.css')
	.pipe(concat('style.css'))
	.pipe(gulp.dest('build/css'));
});

gulp.task('default', ['scripts', 'styles']);