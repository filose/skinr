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
        sourceMap: true
      },
      dist: {
        files: [{
          'css/style.css': 'sass/style.scss'
        },
        {
          'css/essential.css': 'sass/essential.scss'
        }]
      }
    },

    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      }
    }
  });

  grunt.registerTask('default', ['uglify'], ['sass']);

};