module.exports = {
  build_dir: 'build',
  compile_dir: 'dist',
  deploy_command: '~/google_appengine/appcfg.py update .',

  app_files: {
    factions: [
      'src/app/factions/**/*.json'
    ],

    grunt: [
      'Gruntfile.js',
      'build.config.js'
    ],

    html: [
      'src/index.html'
    ],

    js: [
      'src/**/*.js',
      '!src/**/*.spec.js',
      '!src/assets/**/*.js'
    ],
    js_unit: [
      'src/**/*.spec.js'
    ],

    less: [
      'src/less/app.less'
    ],

    tpl_app: [
      'src/app/**/*.tpl.html'
    ],
    tpl_common: [
      'src/common/**/*.tpl.html'
    ]
  },

  test_files: {
    js: [
      'bower_components/angular-mocks/angular-mocks.js'
    ]
  },

  vendor_files: {
    js: [
      'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-route/angular-route.js'
    ],

    css: [
    ],

    assets: [
    ]
  }
};
