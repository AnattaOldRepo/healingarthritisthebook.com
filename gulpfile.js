/* 
* @Author: ajain
* @Date:   2016-01-25 23:01:43
* @Last Modified by:   ajain
* @Last Modified time: 2016-02-05 00:18:02
*/

'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync'), // Browser auto reload and sync
	plumber = require('gulp-plumber'), // find gulp compling error
	sass = require('gulp-sass'),	// required [gulp-sass] plugin
	prefix = require('gulp-autoprefixer'), // autofix vendor css usinig [gulp-autoprefixer] plugin
	cache = require('gulp-cache'),
	notify	=	require('gulp-notify'),	// Notify message when task done using  [gulp-notify] plugin
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cssnano = require('gulp-cssnano'),
	coffee = require('gulp-coffee'),
	jade = require('gulp-jade'),
	sourceMaps 		= require('gulp-sourcemaps'),
	runSequence = require('run-sequence'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	gulpIf = require('gulp-if'),
	rename = require('gulp-rename'),
	reload      = browserSync.reload;

var paths = {
	root: 		'root',

	scss:  		'dev/scss/**/*.scss',
	jade:		'dev/jade/*.jade',
	devimg:    	'dev/images/**/*.+(png|jpg|jpeg|gif|svg)',
	fonts: 		'dev/fonts/**/*.+(eot,svg,ttf,woff,woff2)',
	devjs: 		'dev/js/',
	efgtassets: 'dev/assets',

	dist: 		'dist/',
	js: 		'dist/js',
	css: 		'dist/css',
	html: 		'.',
	distimg: 	'dist/images/'

};

// Static server
gulp.task('browserSync', function() {
     browserSync.init({
        proxy: "http://efgt.web/"
    });

});

// Complie Styles
gulp.task('styles', function() {
	return gulp.src( paths.scss )	// Get all scss files
		.pipe( plumber() )
		.pipe(sourceMaps.init())
		.pipe( sass( {
			outputStyle: 'expanded',
			includePaths: require('node-bourbon').includePaths
		} ) ) // Converts Sass to CSS with gulp-sass
		.pipe( prefix( ["last 3 version"] ) )
		.pipe( gulp.dest( paths.css ) )	// inject compiled scss to the distribution folder
		.pipe( notify( { message: 'style task compleated' } ) )
		.pipe(reload({stream:true}))
		.pipe( notify( { message: 'browser styles synced' } ) )
		.pipe(sourceMaps.write())
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src(paths.devimg)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.distimg))
    .pipe(notify({ message: 'Images task complete' }));
});

//Compile jade into html

gulp.task('jade', function() {
	return gulp.src( paths.jade)
	.pipe( plumber() )
	.pipe( jade( {
		pretty: true
	} ) )
	.pipe( gulp.dest( paths.html ) )
	.pipe( notify( { message: 'jade task compleated' } ) )
	.pipe(reload({stream:true}))
	.pipe( notify( { message: ' browser html synced ' } ) )
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['dev/js/library/*.js', 'dev/js/vendor/*.js', 'dev/js/transcript.js', 'dev/js/main.js' ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(reload({stream:true}))
    .pipe( notify( { message: 'browser Scripts synced' } ) )
});

gulp.task('scriptsmc', function() {
  return gulp.src(['dev/js/mc-validation.js'])
    .pipe(concat('mc-validation.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js))
    .pipe(notify({ message: 'MC Scripts task complete' }))
    .pipe(reload({stream:true}))
    .pipe( notify( { message: 'browser MC Scripts synced' } ) )
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(['dev/fonts/**/*'])
            .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('efgtassets', function() {
	return gulp.src(['dev/assets/**/*'])
	.pipe(gulp.dest('dist/assets/'));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch(paths.scss, ['styles']);
  gulp.watch('dev/jade/**/*.jade', ['jade']);
  gulp.watch('dev/js/**/*.js', ['scripts']);
  gulp.watch('*.html', browserSync.reload);
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
});
gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// gulp.task('watch', ['browserSync', 'styles', 'jade'], function() {
// 	gulp.watch( 'dev/jade/**/*.jade', ['jade'] );
//   	gulp.watch( paths.scss, ['styles'] );
//   	gulp.watch('images/**/*', ['images']);
// });

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['styles', 'scripts', 'scriptsmc', 'jade', 'browserSync',  'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['styles', 'scripts', 'scriptsmc', 'jade', 'images', 'fonts', 'efgtassets'],
    callback
  )
})