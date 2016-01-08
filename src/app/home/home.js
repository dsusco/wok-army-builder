angular
  .module('ngBoilerplate.home', [
    'ui.router'
  ])
  .config(function config($stateProvider) {
    $stateProvider.state('home', {
      data: { pageTitle: 'Home' },
      url: '/home',
      views: {
        main: {
          controller: 'HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        }
      }
    });
  })
  .controller('HomeCtrl', [function HomeController() {
  }]);
