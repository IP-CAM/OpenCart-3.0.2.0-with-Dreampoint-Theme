var gulp = require('gulp');


//from less to styles
var less = require('gulp-less');
var path = require('path');

//autoprefixer
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 40 versions'] });

//map
var sourcemaps = require('gulp-sourcemaps');


var plumber = require('gulp-plumber');




gulp.task('less', function () {
    // return gulp.src('catalog/view/theme/dreampoint/stylesheet/home.less')
    return gulp.src(['catalog/view/theme/dreampoint/stylesheet/*.less', '!catalog/view/theme/dreampoint/stylesheet/set.less'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ],
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('catalog/view/theme/dreampoint/stylesheet/'));
});







var watch = require('gulp-watch');
gulp.task('watch', function() {
    gulp.watch('catalog/view/theme/dreampoint/stylesheet/*.less', ['less']); // Наблюдение за less файлами
    // Наблюдение за другими типами файлов
});


gulp.task("build", ["less", "watch"]);

gulp.task("default", ["build"]);



