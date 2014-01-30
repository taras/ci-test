module.exports = function(grunt) {

  grunt.initConfig({
    env: {
      user: 'taras',
      repository: 'ci-test',
      gh_token: process.env.GH_TOKEN
    },
    gitinfo: {
      commands: {
        commit: ['describe', '--always', '--tag']
      }
    },
    clean: {
      "gh-pages": ['gh-pages']
    },
    zip: {
      dist: {
        cwd: 'src',
        src: ['src/**/*'],
        dest: 'gh-pages/builds/<%= gitinfo.commit %>.zip'
      }
    },
    shell: {
      options: {
        stderr: true
      },
      "clone-gh-pages": {
        command: "git clone --quiet --branch=gh-pages https://<%= env.gh_token %>@github.com/<%= env.user %>/<%= env.repository %>.git gh-pages"
      },
      "set-ident": {
        command: [
          'git config --global user.email "travis@travis-ci.org"',
          'git config --global user.name "Travis"'
        ].join('&&'),
        options: {
          execOptions: {
            cwd: 'gh-pages'
          }
        }
      },
      "add-build": {
        command: "git add builds",
        options: {
          execOptions: {
            cwd: 'gh-pages'
          }
        }
      },
      "commit-build": {
        command: "git commit -m 'Committed build for <%= gitinfo.commit %>'",
        options: {
          execOptions: {
            cwd: 'gh-pages'
          }
        }
      },
      "push-build": {
        command: "git push",
        options: {
          execOptions: {
            cwd: 'gh-pages'
          }
        }
      }
    },
    to_html: {
      "build-index": {
        options: {
          generatePage: true,
          template: grunt.file.read('template.jade')
        },
        files: {
          'gh-pages/builds/index.html': 'gh-pages/builds/*.zip'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-directory-to-html');

  grunt.registerTask('test', function(){});

  grunt.registerTask('release', ['gitinfo',
                                 'clean:gh-pages',
                                 'shell:clone-gh-pages',
                                 'shell:set-ident',
                                 'zip:dist',
                                 'to_html:build-index',
                                 'shell:add-build',
                                 'shell:commit-build',
                                 'shell:push-build']);

  grunt.registerTask('default', ['test']);

};