angular
  .module('ngBoilerplate.about', [
    'ui.router',
    'placeholders',
    'ui.bootstrap'
  ])
  .config(function config($stateProvider) {
    $stateProvider.state('about', {
      data: { pageTitle: 'What is It?' },
      url: '/about',
      views: {
        main: {
          controller: 'AboutCtrl',
          templateUrl: 'about/about.tpl.html'
        }
      }
    });
  })
  .controller('AboutCtrl', ['$scope', function AboutCtrl($scope) {
    $scope.dropdownDemoItems = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];
  }]);
