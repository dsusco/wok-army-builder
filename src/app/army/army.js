angular
  .module('wokArmyBuilder.army', [])

  .service('army', ['gameSizes', 'models', function (gameSizes, models) {
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

        if (gameSizes[army.gameSize].Options !== undefined) {
          [1, 2].forEach(function (i) {
            army.lists['Options List #' + i] = {
              Infantry: models.Infantry.map(return0),
              Specialist: models.Specialist.map(return0)
            };
          });
        }
      }
    };
  }]);
