var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var browserify = require('browserify');
var react = require('gulp-react');
var notify = require('gulp-notify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var htmlreplace = require('gulp-html-replace');

var projectRootFolder = '../src/main/webapp/';
var projectSrcFolder = projectRootFolder + 'assets/';

var projectJsFolder = projectSrcFolder + 'js/';
var projectJsApplication = 'application.js';
var projectCssFolder = projectSrcFolder + 'css/';

var Profile = require('./Profile');

gulp.task('js', function(){
    var appBundler = browserify({
        entries: ["src/js/Application.js"],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths:true // Requirement of watchify
    });
    appBundler
        .transform(["babelify"])
        .bundle()
        .on('error', function(){
                console.log(arguments);
        })
        .pipe(source(projectJsApplication))
        .pipe(gulpif(Profile.env === 'prod', streamify(uglify())))
        .pipe(gulp.dest(projectJsFolder))
        .pipe(notify({ message: 'JS task complete' }));
});


gulp.task('copy', function(){
    gulp.src('src/index.html')
        /*.pipe(htmlreplace({
            'base': '<base href="' + Profile.frontend +'" />'
        }))*/
        .pipe(gulp.dest(projectRootFolder))
        .pipe(notify({ message: 'Copy task complete' }));
});

gulp.task('css', function(){
    gulp.src(['src/scss/main.scss', 'node_modules/rc-calendar/assets/bootstrap.css'])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat("compiled.css"))
        .pipe(gulp.dest(projectCssFolder))
        .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('deploy', ['js', 'copy', 'css']);
gulp.task('default', ['js', 'css']);
