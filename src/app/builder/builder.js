angular
  .module('wokArmyBuilder.builder', [
    'wokArmyBuilder.builder.actions',
    'wokArmyBuilder.builder.faction',
    'wokArmyBuilder.builder.army',
    'wokArmyBuilder.builder.recordSheet'
  ])

  .controller('BuilderController', ['$scope', '$location', 'Army', function BuilderController($scope, $location, Army) {
    var builder = this;

    angular.extend(builder, {
      army: Army,
      tabs: {
        active: [true, false, false],
        enableArmy: false
      }
    });

    $scope.$on('$locationChangeSuccess', function () {
      var search = $location.search();

      Army.gameSize = search.gameSize;
      Army.faction = search.faction;

      setTimeout(function () {
        Army.lists = angular.fromJson(search.lists);
      });
    });

    $scope.$watchGroup(['builder.army.gameSize', 'builder.army.faction'], function watchArmy(values) {
      if (values.every(function (value) { return value !== undefined; })) {
        builder.tabs.enableArmy = true;
        builder.tabs.active[1] = true;
      }
    });
  }])

  .service('Army', ['$location', 'Models', 'gameSizes', function ArmyService($location, Models, gameSizes) {
    var
      army = this,
      search = $location.search();

    function return0() { return 0; }

    army.characterSelectedInOptions = function characterSelectedInOptions(model) {
      var selected = false;

      Object.getOwnPropertyNames(army.lists)
        .filter(function (list) {
          return list !== 'Core List';
        })
        .forEach(function (list) {
          list = army.lists[list];

          Object.getOwnPropertyNames(list).forEach(function (type) {
            list[type].forEach(function (number, index) {
              if (Models[type][index] === model) {
                selected = selected || number > 0;
              }
            });
          });
        });

      return selected;
    };

    army.options = function options(list) {
      var
        options = 0,
        types = army.lists[list];

      Object.getOwnPropertyNames(types).forEach(function (type) {
        options += types[type].reduce(function (previous, current, index) {
          if (Models[type][index].traits === undefined) { current *= 3; }

          return previous + current * Models[type][index].rank;
        }, 0);
      });

      return options;
    };

    army.ranks = function ranks(type) {
      return army.lists['Core List'][type].reduce(function (previous, current, index) {
        return previous + current * Models[type][index].rank;
      }, 0);
    };

    army.resetLists = function resetLists() {
      if (army.gameSize !== undefined && army.faction !== undefined) {
        try {
          army.lists = {
            'Core List': {
              Leader: Models.Leader.map(return0),
              Infantry: Models.Infantry.map(return0),
              Specialist: Models.Specialist.map(return0)
            }
          };

          if (gameSizes[army.gameSize].Options !== undefined) {
            [1, 2].forEach(function forEachOption(i) {
              army.lists['Options List #' + i] = {
                Infantry: Models.Infantry.map(return0),
                Specialist: Models.Specialist.map(return0)
              };
            });
          }
        } catch (ignore) {}
      }
    };

    army.gameSize = search.gameSize;
    army.faction = search.faction;

    setTimeout(function () {
      army.lists = angular.fromJson(search.lists);
    });
  }])

  .service('Models', ['factions', function ModelsService(factions) {
    var models = this;

    models.load = function load(faction) {
      faction = factions[faction];

      if (faction !== undefined) {
        models.Leader = faction.Leader;
        models.Infantry = faction.Infantry;
        models.Specialist = faction.Specialist;
      }
    };
  }]);
