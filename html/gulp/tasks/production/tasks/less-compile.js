'use strict';

const $                    = require('gulp-load-plugins')();
const gulp                 = require('gulp');
const config               = require('../../../config');
const lessPluginAutoPrefix = require('less-plugin-autoprefix');
const lessPluginCleanCSS   = require('less-plugin-clean-css');
var fs              = require("fs");

var autoprefixer = new lessPluginAutoPrefix(config.autoprefixer),
    cleancss     = new lessPluginCleanCSS({ advanced: true });

function str_replace(search, replace, subject) {
    return subject.split(search).join(replace);
}

module.exports = function(options) {
    return config.wrapPipe(function(success, error) {
        return gulp.src(config.less.src)
            .pipe($.less({
                plugins: [autoprefixer, cleancss],
            }).on('error', error))
            .pipe($.csscomb())
            .pipe($.csso({
                sourceMap: false,
            }))
            .pipe(gulp.dest(config.less.dest))
            .on('end',function () {
                var path = 'build/css/main.css';
                var fileContent = fs.readFileSync(path, "utf8");
                var result = fileContent;
                result = str_replace("@font-face{","@font-face{font-dispaly:swap;",result);
                fs.writeFile(path, result,function () {
                    return true;
                });
            });;
    });
};