const gulp = require('gulp');

const babelify   = require('babelify');
const browserify = require('browserify');
const rename     = require('gulp-rename');
const source     = require('vinyl-source-stream');
const streamify  = require('gulp-streamify');
const uglify     = require('gulp-uglify');

gulp.task('browserify', () => {
    let dest = 'static';

    browserify({
        entries: 'src/app/index.jsx',
        extensions: ['.js', '.jsx'],
    })
    .transform('babelify')
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(dest))
    .pipe(streamify(uglify()))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(dest));
});

gulp.task('vendor', () => {
    // Bootstrap CSS
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('static/vendor/css'));
});

gulp.task('default', ['browserify'], () => {
    return gulp.watch('src/**/*.*', ['browserify'])
});
