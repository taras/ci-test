module.exports = function(grunt) {
  grunt.initConfig({
    "github-release": {
      options: {
        repository: 'dolbyzerr/grunt-github-releaser', // Path to repository
        auth: {   // Auth credentials
          user: 'dolbyzerr',
          password: ''
        }
      },
      files: {
        src: ['dist/release.zip'] // Files that you want to attach to Release
      }
    }
  });

  grunt.registerTask('test', function(){

  });

  grunt.registerTask('default', ['test']);
};