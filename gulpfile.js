'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var FiveThirtyEightGulpTasks = require('@fivethirtyeight/interactive-gulp-tasks');
var fiveThirtyEightGulpTasks = new FiveThirtyEightGulpTasks(gulp);

var projectName = fiveThirtyEightGulpTasks.projectName;
var pageconfig = require('./src/data/pageconfig.json');

var commonJavascriptLibs = [];

gulp.task('js-common', fiveThirtyEightGulpTasks.javascript.compileCommon({ include: commonJavascriptLibs }));

var jsCompile = fiveThirtyEightGulpTasks.javascript.compile({ exclude: commonJavascriptLibs });
gulp.task('js-dev', jsCompile);
gulp.task('js-full', ['js-common'], jsCompile);

gulp.task('css', ['sprite'], fiveThirtyEightGulpTasks.css.compile());
gulp.task('lint-scss', fiveThirtyEightGulpTasks.css.lint());

gulp.task('images', fiveThirtyEightGulpTasks.images.compile());
gulp.task('sprite', fiveThirtyEightGulpTasks.images.sprite());

gulp.task('js-bust', ['js-full'], fiveThirtyEightGulpTasks.javascript.bust());
gulp.task('css-bust', ['css'], fiveThirtyEightGulpTasks.css.bust());
gulp.task('images-bust', ['images'], fiveThirtyEightGulpTasks.images.bust());


var extraTemplateVars = {
  pageconfig: pageconfig,
  utils: require("./src/js/utils.js")
};


gulp.task('jade-dev', fiveThirtyEightGulpTasks.templates.compile(extraTemplateVars));
gulp.task('jade-data', ['data'], fiveThirtyEightGulpTasks.templates.compile(extraTemplateVars));
gulp.task('jade-full', ['js-bust', 'css-bust', 'images-bust', 'data'], fiveThirtyEightGulpTasks.templates.compile(extraTemplateVars));


gulp.task('html', fiveThirtyEightGulpTasks.templates.copyHTML());
gulp.task('validate-html', ['html', 'jade'], fiveThirtyEightGulpTasks.templates.validate());

gulp.task('data', fiveThirtyEightGulpTasks.data.compile());
gulp.task('lint', fiveThirtyEightGulpTasks.development.lint());

gulp.task('express', fiveThirtyEightGulpTasks.development.server());
gulp.task('watch', fiveThirtyEightGulpTasks.development.watch());
gulp.task('default', ['jade-full', 'html', 'express', 'watch']);
gulp.task('build', ['jade-full', 'html']);

gulp.task('clean', fiveThirtyEightGulpTasks.deployment.clean());
gulp.task('deploy', ['clean', 'jade-full', 'html'], fiveThirtyEightGulpTasks.deployment.deploy());
gulp.task('purge-cdn', fiveThirtyEightGulpTasks.deployment.purgeCDN());

gulp.task('update-pageconfig', fiveThirtyEightGulpTasks.deployment.updatePageConfig());
