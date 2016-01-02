const gulp = require('gulp');

const babelify   = require('babelify');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');

gulp.task('browserify', () => {
    browserify({
        entries: 'src/app/index.jsx',
        extensions: ['.js', '.jsx'],
    })
    .transform('babelify')
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('static'))
});

gulp.task('default', ['browserify'], () => {
    return gulp.watch('src/**/*.*', ['browserify'])
});
