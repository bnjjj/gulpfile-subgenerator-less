'use strict';
var generators = require('yeoman-generator');
var _ = require('lodash');

var gulpfileGenerator = module.exports = generators.Base.extend({
  initializing: function () {
    this.vars = {};
  },

  prompting: function () {
    var self = this;
    var done = self.async();

    self.prompt([{
      type: 'value',
      name: 'srcCss',
      message: 'What is the relative path to your less source files?',
      default: './css/**/*.scss'
    }, {
      type: 'value',
      name: 'distCss',
      message: 'What is the relative path to your processed css dist files?',
      default: './dist/css'
    }, {
      type: 'value',
      name: 'concat',
      message: 'Do you want to concat your files into one file (less) ?',
      default: 'yes'
    }], function (answers) {
      answers.concat = answers.concat.indexOf('no') !== -1 ? false : true;
      _.assign(self.vars, answers);
      done();
    });
  },

  configuring: function () {
    var self = this;

    if (self.vars.concat) {
      var done = self.async();
      self.prompt([{
        type: 'value',
        name: 'concatFile',
        message: 'What is the name of your main css file for dist (less)?',
        default: 'main.css'
      }], function (answer) {
        _.assign(self.vars, answer);
        done();
      });
    }
  },

  writing: function () {
    var self = this;

    self.template(self.templatePath(), self.destinationPath('./gulp-scripts'), self.vars);
  },

  install: function () {
    var self = this;

    self.installDependencies();
    self.npmInstall(['gulp-less'], { 'saveDev': true });
  },

  end: function () {

  }
});
