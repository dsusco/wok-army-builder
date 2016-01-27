angular.module('ngbp', [
    'templates-app',
    'templates-common',
    'ui.router'
  ])
  .controller('AppCtrl', ['$scope', function AppCtrl($scope) {
    $scope.title = 'ngbp';
  }]);
