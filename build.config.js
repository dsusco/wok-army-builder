module.exports = {
  build_dir: 'build',
  compile_dir: 'dist',

  app_files: {
    js: [
      'src/**/*.js',
      '!src/**/*.spec.js',
      '!src/assets/**/*.js'
    ],
    jsunit: [
      'src/**/*.spec.js'
    ],

    atpl: [
      'src/app/**/*.tpl.html'
    ],
    ctpl: [
      'src/common/**/*.tpl.html'
    ],

    html: [
      'src/index.html'
    ],

    less: [
      'src/less/main.less'
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
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-utils/modules/route/route.js'
    ],

    css: [
    ],

    assets: [
    ]
  }
};
