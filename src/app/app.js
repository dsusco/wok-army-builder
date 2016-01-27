angular.module('ngbp', [
    'templates-app',
    'templates-common'
  ])
  .controller('AppCtrl', ['$scope', function AppCtrl($scope) {
    $scope.title = 'ngbp';
  }]);
