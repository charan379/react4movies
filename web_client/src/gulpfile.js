const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');


function minifyConbineCss(){
    return gulp.src('./styles/react4movies/*.css')
                .pipe(sourcemaps.init())
                .pipe(concat('react4movies.min.css'))
                .pipe(cleanCSS())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('../public'))
}

exports.css = minifyConbineCss
exports.default = minifyConbineCss