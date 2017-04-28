module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: 'public/client/**/*.js',
        dest: 'public/dist/shortly_concat.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/shortly_concat_ugly.js' : ['public/dist/shortly_concat.js']
        }
      }
    },

    eslint: {
      target: [
        'app/**/*.js',
        'lib/**/*.js',
        'public/client/**/*.js',
        'test/**/*.js',
        './server-config.js'
      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },

    gitcommit: {
      release: {
        options: {
          cwd: './',
          message: 'Automatic Commit'
        }
      },
      files: {
        src: ['.'],
      }
    },
    gitadd: {
      release: {
        options: {
          all: true,
          force: false
        }
      },
      files: {
        src: ['.']
      }
    },
    gitpush: {
      release: {
        options: {
          branch: 'master',
          remote: 'live',
          cwd: './'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);
  //build and upload started on npm start
  grunt.registerTask('build', [
    'mochaTest',
    'eslint',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('gitdeploy', ['gitadd','gitcommit','gitpush']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['gitdeploy']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n) {
    // tasks that build and run app locally
    grunt.task.run(['build', 'upload']);
  });


};
