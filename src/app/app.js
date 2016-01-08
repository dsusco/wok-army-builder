angular
  .module('ngBoilerplate', [
    'ngBoilerplate.about',
    'ngBoilerplate.home',
    'templates-app',
    'templates-common',
    'ui.router'
  ])
  .config(function myAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  })
  .run(function run() {
  })
  .controller('AppCtrl', ['$scope', function AppCtrl($scope) {
    $scope.$on('$stateChangeSuccess', function (event, toState) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';
      }
    });
  }]);
