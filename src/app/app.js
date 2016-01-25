angular
  .module('wokArmyBuilder', [
    'templates-app',
    'templates-common',
    'wokArmyBuilder.army',
    'wokArmyBuilder.components',
    'wokArmyBuilder.layout',
    'wokArmyBuilder.models'
  ])

  .controller('ArmyBuilderController', ['$scope', 'army', 'models', function ($scope, army, models) {
    $scope.army = army;
    $scope.models = models;

    $scope.$on('characterChange', function (event, model, value) {
      var modelIndex, maxValue;

      if (event.list === 'Core List') {
        $scope.$broadcast('toggleCharacter', model, value, true);
      } else {
        modelIndex = models.Specialist.indexOf(model);

        maxValue =
          Object.getOwnPropertyNames(army.lists).map(function (list) {
            if (list !== 'Core List' && list !== event.list) {
              return army.lists[list].Specialist[modelIndex];
            }
          }).concat(value)
            .reduce(function (previous, current) {
              return current === undefined || previous > current ? previous : current;
            });

        $scope.$broadcast('toggleCharacter', model, maxValue, false);
      }
    });

    $scope.$watch('army.gameSize', function () {
      army.setLists();

      try {
        models.Leader.concat(models.Specialist).forEach(function (model) {
          if (model.character) {
            $scope.$broadcast('checkCharacterSelected', model, 0);
          }
        });
      } catch (ignore) {}
    });

    $scope.$watch('army.faction', function (faction) {
      models.load(faction, army.setLists);
    });
  }]);
