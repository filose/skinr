module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: 'js/skinr.js',
        dest: 'js/skinr.min.js'
      }
    }
  });

  grunt.registerTask('default', ['uglify']);

};