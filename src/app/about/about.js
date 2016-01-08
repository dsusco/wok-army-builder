angular
  .module('ngBoilerplate.about', [
    'ui.router'
  ])
  .config(function config($stateProvider) {
    $stateProvider.state('about', {
      data: { pageTitle: 'About' },
      url: '/about',
      views: {
        main: {
          controller: 'AboutCtrl',
          templateUrl: 'about/about.tpl.html'
        }
      }
    });
  })
  .controller('AboutCtrl', [function AboutCtrl() {
  }]);
