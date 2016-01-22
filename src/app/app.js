angular
  .module('wokArmyBuilder', [
    'templates-app',
    'templates-common',
    'wokArmyBuilder.layout'
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
  }])

  .directive('wokOptionList', function () {
    return {
      controller: ['$scope', function ($scope) {
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

          $scope.$broadcast('checkRemainingRanks', true, $scope.army.gameSize.Options - $scope.options);
        }, true);
      }]
    };
  })

  .directive('wokType', function () {
    return {
      controller: ['$scope', function ($scope) {
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

          $scope.$broadcast('checkRemainingRanks', false, $scope.army.gameSize[$scope.type] - $scope.ranks);
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
      templateUrl: 'wok-model.tpl.html'
    };
  })

  .filter('factionImageFilter', function () {
    return function (faction) {
      if (faction !== undefined) {
        faction = '/assets/images/' + faction.toLowerCase().replace(/[^0-9a-z]+/g, '-') + '.png';
      } else {
        faction = '';
      }

      return faction;
    };
  })

  .filter('optionsFilter', function () {
    return function (options) {
      options /= 3;

      return options.toFixed(1)
        .replace(/\.0$/, '')
        .replace(/0?\.3$/, '⅓')
        .replace(/0?\.7$/, '⅔');
    };
  })

  .service('army', ['models', function (models) {
    var army = this;

    army.setLists = function () {
      function return0() { return 0; }

      if (army.gameSize !== undefined && army.faction !== undefined && army.faction === models.faction) {
        army.lists = {
          'Core List': {
            Leader: models.Leader.map(return0),
            Infantry: models.Infantry.map(return0),
            Specialist: models.Specialist.map(return0)
          }
        };

        if (army.gameSize.Options !== undefined) {
          [1, 2].forEach(function (i) {
            army.lists['Options List #' + i] = {
              Infantry: models.Infantry.map(return0),
              Specialist: models.Specialist.map(return0)
            };
          });
        }
      }
    };
  }])

  .service('models', ['$http', function ($http) {
    var models = this;

    models.load = function (faction, successCallback) {
      if (faction !== undefined) {
        $http.get('/assets/json/' + faction.toLowerCase().replace(/[^0-9a-z]+/, '-') + '.json')
          .then(function (response) {
            angular.extend(models, { faction: faction }, response.data);
            successCallback();
          }, function (response) {
            console.log(response);
          });
      }
    };
  }]);
