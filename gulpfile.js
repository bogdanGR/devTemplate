var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifier = require('gulp-uglify/minifier');
var cssmin = require('gulp-cssmin');

var prettify = require('gulp-prettify');

gulp.task('watch', function (){
	gulp.watch(['./template/**/*.twig'], ['twig-compl','reload']);
	gulp.watch(['./template/*.twig'], ['twig-compl','reload']);
	gulp.watch(['./blocks/**/*.css','./blocks/**/*.styl'], ['style']);
	gulp.watch(['./blocks/**/*.js'], ['scripts']);
});
gulp.task('connect', function(){
	connect.server({
		root: "./static",
		port: 5001,
		livereload: true
	});
});
gulp.task('reload', function() {
	return gulp.src('./static/*.html')
		.pipe(connect.reload());
});


gulp.task('prettify', function() {
	gulp.src('./static/*.html')
		.pipe(prettify({indent_char: '	', indent_size: 1}))
		.pipe(gulp.dest('./static'))
});

var gulp = require('gulp');

gulp.task('twig-compl', function () {
	'use strict';
	var twig = require('gulp-twig');
	return gulp.src('./template/*.twig')
		.pipe(twig({
			base: './template/'
		}))
		.pipe(gulp.dest('./static/'));
});



gulp.task('scripts', function() {
	return gulp.src(['./blocks/common/common.js','./blocks/**/!(common)*.js'])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./static/'))
		.pipe(connect.reload());
});
gulp.task('style', function() {
	return gulp.src(['./blocks/common/reset.css','./blocks/common/!(reset)*.css','./blocks/**/*.styl'])
		.pipe(stylus({compress: false, 'include css': true}))
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./static/'))
		.pipe(connect.reload());
});


gulp.task('minjs',function(){
	return gulp.src(['./blocks/common/common.js','./blocks/**/!(common)*.js'])
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(minifier())
		.pipe(gulp.dest('./static/'));
});
gulp.task('mincss',function(){
	return gulp.src(['./blocks/common/reset.css','./blocks/common/!(reset)*.css','./blocks/**/*.styl'])
		.pipe(stylus({compress: true, 'include css': true}))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssmin())
		.pipe(gulp.dest('./static/'));
});

gulp.task('default', ['twig-compl','scripts', 'style']);
gulp.task('live', ['connect', 'watch']);
gulp.task('publish', ['minjs', 'mincss', 'twig-compl', 'prettify']);