angular
  .module('wokArmyBuilder.builder.army.model', [
  ])

  .controller('ModelController', ['$scope', function ModelController($scope) {
    function add(value) {
      $scope.number += +value;
    }

    angular.extend($scope, {
      add: add
    });

    $scope.$on('setNotEnoughRanks', function (event, model, notEnoughRanks) {
      if ($scope.model === model) {
        $scope.notEnoughRanks = notEnoughRanks;
      }
    });

    $scope.$on('setSelectedCharacter', function (event, model, selectedCharacter) {
      if ($scope.model === model) {
        $scope.selectedCharacter = selectedCharacter;
      }
    });

    $scope.$watch('number', function (number) {
      if ($scope.model.character) {
        $scope.selectedCharacter = +number > 0;
        $scope.$emit('characterSelected', $scope.model, +number > 0);
      }
    });
  }])

  .directive('wokModel', function wokFaction() {
    return {
      controller: 'ModelController',
      scope: {
        model: '=wokModel',
        number: '='
      },
      templateUrl: 'builder/army/model/model.tpl.html'
    };
  });
