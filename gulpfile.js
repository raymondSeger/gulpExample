"use strict";

var gulp 	= require("gulp");
var concat 	= require("gulp-concat");
var uglify 	= require("gulp-uglify");
var rename  = require("gulp-rename");
var sass 	= require("gulp-sass");
var maps 	= require("gulp-sourcemaps");

// concat the scripts
// we also use SourceMaps here to make the error and debugging easier for scripts that have been combined
gulp.task("concatScripts", function() {
  console.log("concatScripts activated");

  return gulp.src([
  		"jquery.js",
  		"index.js",
  		"index2.js"
  	])
  .pipe(maps.init())
  .pipe(concat("appAllScripts.js"))
  .pipe(maps.write('./'))
  .pipe(gulp.dest("js/dist"));
});

// compress the scripts
gulp.task('compress', ["concatScripts"], function() {

	console.log("compress activated"); 

  return gulp.src('js/dist/appAllScripts.js')
    .pipe(uglify())
    .pipe(rename("appAllScripts.min.js"))
    .pipe(gulp.dest('js/dist'));
});

// compile SASS / SCSS, also it use SourceMaps gulp to create the css map for debugging
gulp.task('compileSass', function () {

	console.log("compileSass activated"); 

  return gulp.src('./scss/*.scss')
  .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./css'));
});

// run compileSass everytime files in that specific folder (parameter 1) changes
gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['compileSass']);
});

// test Hello task
gulp.task("hello", function() {
  console.log("hello activated");
});

// run hello task THEN default task
gulp.task("default", ["hello"], function() {
  // place code for your default task here
  console.log("default activated");
});

// run all task in sync
// we don't need to specify some gulp tasks because it is considered as dependencies, the dependencies tasks will run first
gulp.task("build", ["compress", "compileSass", "default"], function() {
  // place code for your default task here
  console.log("build activated");
});