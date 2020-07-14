'use strict';

const gulp           = require('gulp');
const bowerRequireJS = require('bower-requirejs');
const config    	 = require('../../../config');

module.exports = function(options) {
    return function(callback) {
		bowerRequireJS({
		    config:     'src/js/config.js',
		    exclude:    ['jquery','html5shiv','nouislider','devbridge-autocomplete','jquery-mask-plugin','jquery-validation'],
		    transitive: false
		});
		gulp.src(config.bower)
            .pipe(gulp.dest(config.js.dest + 'bower_components/'));

		callback();
    }
};