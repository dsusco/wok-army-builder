angular
  .module('wokArmyBuilder.components', [])

  .directive('wokOptionList', function () {
    return {
      controller: ['$scope', 'gameSizes', function ($scope, gameSizes) {
        $scope.options = 0;

        $scope.$on('characterChange', function (event) {
          event.list = $scope.list;
        });

        $scope.$on('toggleCharacter', function (event, model, value, isCoreListCharacter) {
          if (isCoreListCharacter) {
            $scope.$broadcast('checkCharacterSelected', model, value);
          }
        });

        $scope.$watch('army.lists[list]', function (list) {
          var options = 0;

          Object.getOwnPropertyNames(list).forEach(function (type) {
            options += list[type].reduce(function (previous, current, index) {
              if (index === 1) {
                previous *= $scope.models[type][0].rank;

                if ($scope.models[type][0].traits === undefined) { previous *= 3; }
              }

              if ($scope.models[type][index].traits === undefined) { current *= 3; }

              return previous + current * $scope.models[type][index].rank;
            });
          });

          $scope.options = options;

          $scope.$broadcast('checkRemainingRanks', true, gameSizes[$scope.army.gameSize].Options - $scope.options);
        }, true);
      }]
    };
  })

  .directive('wokType', function () {
    return {
      controller: ['$scope', 'gameSizes', function ($scope, gameSizes) {
        $scope.ranks = 0;

        $scope.$on('characterChange', function (event) {
          event.list = $scope.list;
        });

        $scope.$on('toggleCharacter', function (event, model, value, isCoreListCharacter) {
          if (!isCoreListCharacter) {
            $scope.$broadcast('checkCharacterSelected', model, value);
          }
        });

        $scope.$watchCollection("army.lists[list][type]", function (numbers) {
          $scope.ranks = numbers.reduce(function (previous, current, index) {
            return previous + current * $scope.models[$scope.type][index].rank;
          });

          $scope.$broadcast('checkRemainingRanks', false, gameSizes[$scope.army.gameSize][$scope.type] - $scope.ranks);
        });
      }]
    };
  })

  .directive('wokModel', function () {
    return {
      controller: ['$scope', function ($scope) {
        $scope.add = function (value) {
          $scope.number += +value;

          if ($scope.model.character) {
            $scope.selectedCharacter = +value > 0;
            $scope.$emit('characterChange', $scope.model, +value);
          }
        };

        $scope.$on('checkCharacterSelected', function (event, model, value) {
          if ($scope.model === model) {
            $scope.selectedCharacter = value > 0;
          }
        });

        $scope.$on('checkRemainingRanks', function (event, isOptionList, remainingRanks) {
          if (isOptionList && $scope.model.traits === undefined) {
            $scope.notEnoughRanks = $scope.model.rank * 3 > remainingRanks;
          } else {
            $scope.notEnoughRanks = $scope.model.rank > remainingRanks;
          }
        });
      }],
      scope: {
        model: '=wokModel',
        number: '='
      },
      templateUrl: 'components/wok-model.tpl.html'
    };
  });
