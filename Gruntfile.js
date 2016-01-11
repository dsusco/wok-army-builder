module.exports = function (grunt) {
  var
    filterCSS = function filterCSS(files) {
      return files.filter(function (file) { return file.match(/\.css$/); });
    },
    filterJS = function filterJS(files) {
      return files.filter(function (file) { return file.match(/\.js$/); });
    },
    userConfig = require('./build.config.js'),
    taskConfig = {
      pkg: grunt.file.readJSON('package.json'),

      bump: {
        options: {
          files: [
            'package.json',
            'bower.json'
          ],
          commit: false,
          commitFiles: [
            'package.json',
            'bower.json'
          ],
          createTag: false,
          push: false
        }
      },

      clean: [
        '<%= build_dir %>',
        '<%= compile_dir %>'
      ],

      concat: {
        build_css: {
          src: [
            '<%= vendor_files.css %>',
            '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
          ],
          dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        },

        compile_js: {
          options: {
            banner: '<%= meta.banner %>'
          },
          src: [
            '<%= vendor_files.js %>',
            'grunt_tpls/module-prefix.tpl.js',
            '<%= build_dir %>/src/**/*.js',
            '<%= html2js.app.dest %>',
            '<%= html2js.common.dest %>',
            'grunt_tpls/module-suffix.tpl.js'
          ],
          dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
        }
      },

      connect: {
        build: {
          options: {
            base: '<%= build_dir %>',
            livereload: true,
            open: true,
            port: 3000
          }
        },
        compile: {
          options: {
            base: '<%= compile_dir %>',
            livereload: true,
            open: true,
            port: 3000
          }
        }
      },

      copy: {
        build_app_assets: {
          files: [
            {
              expand: true,
              cwd: 'src/assets',
              src: '**',
              dest: '<%= build_dir %>/assets/'
            }
          ]
        },
        build_app_js: {
          files: [
            {
              expand: true,
              cwd: '.',
              src: '<%= app_files.js %>',
              dest: '<%= build_dir %>/'
            }
          ]
        },
        build_vendor_assets: {
          files: [
            {
              expand: true,
              flatten: true,
              cwd: '.',
              src: '<%= vendor_files.assets %>',
              dest: '<%= build_dir %>/assets/'
            }
          ]
        },
        build_vendor_css: {
          files: [
            {
              expand: true,
              cwd: '.',
              src: '<%= vendor_files.css %>',
              dest: '<%= build_dir %>/'
            }
          ]
        },
        build_vendor_js: {
          files: [
            {
              expand: true,
              cwd: '.',
              src: '<%= vendor_files.js %>',
              dest: '<%= build_dir %>/'
            }
          ]
        },
        compile_assets: {
          files: [
            {
              expand: true,
              cwd: '<%= build_dir %>/assets',
              src: '**',
              dest: '<%= compile_dir %>/assets'
            },
            {
              expand: true,
              cwd: '.',
              src: '<%= vendor_files.css %>',
              dest: '<%= compile_dir %>/'
            }
        ]
        }
      },

      delta: {
        options: {
          livereload: true
        },

        assets: {
          files: 'src/assets/**/*',
          tasks: [
            'copy:build_app_assets',
            'copy:build_vendor_assets'
          ]
        },

        gruntfile: {
          options: {
            livereload: false
          },
          files: 'Gruntfile.js',
          tasks: [
            'jshint:gruntfile',
            'jscs:gruntfile'
          ]
        },

        html: {
          files: '<%= app_files.html %>',
          tasks: [
            'index:build'
          ]
        },

        js_src: {
          files: '<%= app_files.js %>',
          tasks: [
            'jshint:src',
            'jscs:src',
            'karma:unit:run',
            'copy:build_app_js'
          ]
        },

        js_unit: {
          options: {
            livereload: false
          },
          files: '<%= app_files.js_unit %>',
          tasks: [
            'jshint:test',
            'jscs:test',
            'karma:unit:run'
          ]
        },

        less: {
          files: 'src/**/*.less',
          tasks: [
            'less:build'
          ]
        },

        tpls: {
          files: [
            '<%= app_files.tpl_app %>',
            '<%= app_files.tpl_common %>'
          ],
          tasks: [
            'html2js'
          ]
        }
      },

      html2js: {
        app: {
          options: {
            base: 'src/app'
          },
          src: '<%= app_files.tpl_app %>',
          dest: '<%= build_dir %>/templates-app.js'
        },

        common: {
          options: {
            base: 'src/common'
          },
          src: '<%= app_files.tpl_common %>',
          dest: '<%= build_dir %>/templates-common.js'
        }
      },

      index: {
        build: {
          dir: '<%= build_dir %>',
          src: [
            '<%= vendor_files.js %>',
            '<%= build_dir %>/src/**/*.js',
            '<%= html2js.common.dest %>',
            '<%= html2js.app.dest %>',
            '<%= vendor_files.css %>',
            '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
          ]
        },

        compile: {
          dir: '<%= compile_dir %>',
          src: [
            '<%= concat.compile_js.dest %>',
            '<%= vendor_files.css %>',
            '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
          ]
        }
      },

      jscs: {
        gruntfile: '<%= app_files.grunt %>',
        src: '<%= app_files.js %>',
        test: '<%= app_files.js_unit %>'
      },

      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        gruntfile: '<%= app_files.grunt %>',
        src: '<%= app_files.js %>',
        test: '<%= app_files.js_unit %>'
      },

      karma: {
        options: {
          configFile: '<%= build_dir %>/karma-unit.js'
        },
        unit: {
          background: true,
          port: 9019
        },
        continuous: {
          singleRun: true
        }
      },

      karma_config: {
        unit: {
          dir: '<%= build_dir %>',
          src: [
            '<%= vendor_files.js %>',
            '<%= html2js.app.dest %>',
            '<%= html2js.common.dest %>',
            '<%= test_files.js %>'
          ]
        }
      },

      less: {
        build: {
          files: {
            '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.less %>'
          }
        },
        compile: {
          options: {
            compress: true
          },
          files: {
            '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.less %>'
          }
        }
      },

      meta: {
        banner:
          '/*!\n' +
          ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
          ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
          ' * Licensed under the <%= pkg.license %> license\n' +
          ' */\n'
      },

      ngAnnotate: {
        compile: {
          files: [
            {
              expand: true,
              cwd: '<%= build_dir %>',
              src: '<%= app_files.js %>',
              dest: '<%= build_dir %>'
            }
          ]
        }
      },

      uglify: {
        compile: {
          options: {
            banner: '<%= meta.banner %>'
          },
          files: {
            '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
          }
        }
      }
    };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.registerTask('default', ['build', 'compile']);

  grunt.registerTask('build', [
    'clean',
    'html2js',
    'jshint',
    'jscs',
    'less:build',
    'concat:build_css',
    'copy:build_app_assets',
    'copy:build_vendor_assets',
    'copy:build_app_js',
    'copy:build_vendor_js',
    'copy:build_vendor_css',
    'index:build',
    'karma_config',
    'karma:continuous'
  ]);

  grunt.registerTask('compile', [
    'less:compile',
    'copy:compile_assets',
    'ngAnnotate',
    'concat:compile_js',
    'uglify',
    'index:compile'
  ]);

  grunt.registerTask('compile:watch', [
    'compile',
    'connect:compile',
    'delta'
  ]);

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['build', 'karma:unit', 'connect:build', 'delta']);

  grunt.registerMultiTask('index', 'Process index.html template', function index() {
    var
      dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g'),
      jsFiles = filterJS(this.filesSrc).map(function forEachJSFile(file) {
        return file.replace(dirRE, '');
      }),
      cssFiles = filterCSS(this.filesSrc).map(function forEachCSSFile(file) {
        return file.replace(dirRE, '');
      });

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
      process: function process(content) {
        return grunt.template.process(content, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });

  grunt.registerMultiTask('karma_config', 'Process karma config templates', function karmaConfig() {
    var jsFiles = filterJS(this.filesSrc);

    grunt.file.copy('grunt_tpls/karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
      process: function process(content) {
        return grunt.template.process(content, { data: { scripts: jsFiles } });
      }
    });
  });
};
