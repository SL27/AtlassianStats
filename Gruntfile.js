module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js','index.js', 'api/**/*.js', 
      'model/**/*.js', 'query/**/*.js', 'utils/**/*.js']
    },
    nodemon: {
      dev: {
        script: 'index.js'
      }
    }
  });

  grunt.registerTask('default', ['jshint','nodemon']);
};