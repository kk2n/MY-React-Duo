//导入依耐
const gulp = require('gulp');
const rename= require('gulp-rename');
const concat= require('gulp-concat');
const uglify= require('gulp-uglify');



//API服务器---------------------------------------------------
const path = require('path');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const server = path.resolve(__dirname, 'api');
gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        //proxy: "http://localhost:888", // 代理web服务器端口
        //port: 888
    });
});
// browser-sync 监听文件
gulp.task('api', ['browser-sync'], function () {
    gulp.watch(['./api/API.js', './api/**'], ['bs-delay']);
});
// 延时刷新
gulp.task('bs-delay', function () {
    setTimeout(function () {
        browserSync.reload();
    }, 1000);
});
// 服务器重启
gulp.task('nodemon', function (cb) {
    // 设个变量来防止重复重启
    let started = false;
    let stream = nodemon({
        script: './api/server.js',
        // 监听文件的后缀
        ext: "js",
        env: {
            'NODE_ENV': 'development'
        },
        // 监听的路径
        watch: [
            server
        ]
    });
    stream.on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('crash', function () {
        stream.emit('restart', 10)
    })
});




//普通全局js打包
gulp.task('commjs', function () {
    return gulp.src([
        './app/commjs/*.js',
        '!./app/commjs/*.c.js',
        '!./app/commjs/comm.js',
    ])
        .pipe(concat('comm.c.js', {newLine: '\n//注释：文件分割\n'}))
        .pipe(gulp.dest('./public/common/'))
        .pipe(uglify())//压缩JS
        .pipe(rename('comm.js'))
        .pipe(gulp.dest('./public/common/'))
});

gulp.task('cc', function () {
    return gulp.src([
        './public/common/q/*'])
    .pipe(concat('comm.cmm.js', {newLine: '\n//注释：文件分割\n'}))
        .pipe(uglify())//压缩JS
        .pipe(rename('comm.min.js'))
        .pipe(gulp.dest('./public/common/'))
});



