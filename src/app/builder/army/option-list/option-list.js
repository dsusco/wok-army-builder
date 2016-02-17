angular
  .module('wokArmyBuilder.builder.army.optionList', [
  ])

  .controller('OptionListController', ['$scope', 'Army', 'Models', 'gameSizes', function OptionListController($scope, Army, Models, gameSizes) {
    function maxOptions() {
      return gameSizes[Army.gameSize].Options;
    }

    angular.extend($scope, {
      army: Army,
      maxOptions: maxOptions,
      models: Models,
      options: 0
    });

    $scope.$on('coreListCharacterSelected', function (event, model, selected) {
      $scope.$broadcast('setSelectedCharacter', model, selected);
    });

    $scope.$watch('army.lists[list]', function (types) {
      $scope.options = Army.options($scope.list);

      Object.getOwnPropertyNames(types).forEach(function (type) {
        Models[type].forEach(function (model) {
          if (model.traits === undefined) {
            $scope.$broadcast('setNotEnoughRanks', model, model.rank * 3 + $scope.options > maxOptions());
          } else {
            $scope.$broadcast('setNotEnoughRanks', model, model.rank + $scope.options > maxOptions());
          }
        });
      });
    }, true);
  }])

  .directive('wokOptionList', function wokOptionList() {
    return {
      controller: 'OptionListController',
      scope: {
        list: '=wokOptionList'
      },
      templateUrl: 'builder/army/option-list/option-list.tpl.html'
    };
  });
