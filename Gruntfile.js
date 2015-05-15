module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: 'js/skinr.js',
        dest: 'js/skinr.min.js'
      }
    },

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    }
  });

  grunt.registerTask('default', ['uglify'], ['sass']);

};