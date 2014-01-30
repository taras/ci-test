module.exports = function(grunt) {

  grunt.initConfig({
    env: {
      user: 'taras',
      repository: 'ci-test',
      commit: process.env.TRAVIS_COMMIT,
      gh_token: process.env.GH_TOKEN
    },
    clean: {
      "gh-pages": ['gh-pages']
    },
    zip: {
      dist: {
        cwd: 'src',
        src: ['src/**/*'],
        dest: 'gh-pages/builds/<%= env.commit %>.zip'
      }
    },
    shell: {
      options: {
        stderr: true
      },
      "clone-gh-pages": {
        command: "git clone https://<%= env.gh_token %>@github.com/<%= env.user %>/<%= env.repository %>.git --branch=gh-pages gh-pages",
        options: {
          cwd: 'gh-pages'
        }
      },
      "add-build": {
        command: "git add -A",
        options: {
          cwd: 'gh-pages'
        }
      },
      "commit-build": {
        command: "git commit -m 'Committed build for <%= env.commit %>'",
        options: {
          cwd: 'gh-pages'
        }
      },
      "push-build": {
        command: "git push origin gh-pages",
        options: {
          cwd: 'gh-pages'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('test', function(){});

  grunt.registerTask('release', ['zip:dist'])

  grunt.registerTask('default', ['test']);

};