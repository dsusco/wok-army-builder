module.exports = {
  build_dir: 'build',
  compile_dir: 'dist',

  app_files: {
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
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-utils/modules/route/route.js'
    ],

    css: [
    ],

    assets: [
      'bower_components/Font-Awesome/fonts/FontAwesome.otf',
      'bower_components/Font-Awesome/fonts/fontawesome-webfont.eot',
      'bower_components/Font-Awesome/fonts/fontawesome-webfont.svg',
      'bower_components/Font-Awesome/fonts/fontawesome-webfont.ttf',
      'bower_components/Font-Awesome/fonts/fontawesome-webfont.woff',
      'bower_components/Font-Awesome/fonts/fontawesome-webfont.woff2'
    ]
  }
};
