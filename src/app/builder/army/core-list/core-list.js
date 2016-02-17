angular
  .module('wokArmyBuilder.builder.army.coreList', [
  ])

  .controller('CoreListController', ['$scope', 'Army', 'Models', 'gameSizes', function CoreListController($scope, Army, Models, gameSizes) {
    function maxRanks(type) {
      return gameSizes[Army.gameSize][type];
    }

    angular.extend($scope, {
      army: Army,
      maxRanks: maxRanks,
      models: Models,
      ranks: {}
    });

    $scope.$on('characterSelected', function (event) {
      event.coreList = true;
    });

    $scope.$on('optionListCharacterSelected', function (event, model, selected) {
      $scope.$broadcast('setSelectedCharacter', model, selected);
    });

    Object.getOwnPropertyNames(Army.lists[$scope.list]).forEach(function (type) {
      $scope.$watchCollection('army.lists[list].' + type, function () {
        $scope.ranks[type] = Army.ranks(type);

        Models[type].forEach(function (model) {
          $scope.$broadcast('setNotEnoughRanks', model, model.rank + $scope.ranks[type] > maxRanks(type));
        });
      });
    });
  }])

  .directive('wokCoreList', function wokCoreList() {
    return {
      controller: 'CoreListController',
      scope: {
        list: '=wokCoreList'
      },
      templateUrl: 'builder/army/core-list/core-list.tpl.html'
    };
  });
