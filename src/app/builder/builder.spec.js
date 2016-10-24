describe('wokArmyBuilder.builder', function () {
  beforeEach(module('wokArmyBuilder'));

  describe('BuilderController', function () {
    var controller, $scope, Army;

    beforeEach(inject(function ($controller, $rootScope, _Army_) {
      $scope = $rootScope.$new();
      Army = _Army_;

      controller = $controller('BuilderController', {
        $scope: $scope,
        Army: Army
      });

      $scope.builder = controller;
    }));

    describe('army', function () {
      it('should be initialized to Army service', function () {
        expect(controller.army).toBe(Army);
      });
    });

    describe('tabs', function () {
      it('enableArmy should be initialized to false', function () {
        expect(controller.tabs.enableArmy).toBe(false);
      });

      it('active should be initialized to 0', function () {
        expect(controller.tabs.active).toBe(0);
      });
    });

    describe('army game size or faction changes', function () {
      it('should not set tabs properties if game size is undefined', function () {
        Army.faction = 'Goritsi';
        $scope.$digest();

        expect(controller.tabs.enableArmy).toBe(false);
        expect(controller.tabs.active).toBe(0);
      });

      it('should not set tabs properties if faction is undefined', function () {
        Army.faction = 'Patrol';
        $scope.$digest();

        expect(controller.tabs.enableArmy).toBe(false);
        expect(controller.tabs.active).toBe(0);
      });

      it('should set tabs properties if both are defined', function () {
        Army.gameSize = 'Patrol';
        Army.faction = 'Goritsi';
        $scope.$digest();

        expect(controller.tabs.enableArmy).toBe(true);
        expect(controller.tabs.active).toBe(1);
      });
    });
  });

  describe('ArmyService', function () {
    var service, Models, gameSizes;

    beforeEach(function () {
      module('wokArmyBuilder.builder', function ($provide) {
        $provide.service('Models', function () {
          angular.extend(this, {
            Leader: [
              { name: "Mock Name",
                rank: 2,
                traits: ["Mock Trait"]
              }
            ],
            Infantry: [
              { name: "Mock Name",
                rank: 1,
                traits: ["Mock Trait"]
              }
            ],
            Specialist: [
              { name: "Mock Name",
                rank: 3,
                character: true
              }
            ]
          });
        });
      });
    });

    beforeEach(inject(function (_gameSizes_, _Models_, Army) {
      gameSizes = _gameSizes_;
      Models = _Models_;
      service = Army;
    }));

    describe('characterSelectedInOptions method', function () {
      beforeEach(function () {
        service.faction = '';
        service.gameSize = 'Skirmish';
        service.resetLists();
      });

      it('should return false if character is not selected in all option lists', function () {
        expect(service.characterSelectedInOptions(Models.Specialist[0])).toBeFalsy();
      });

      it('should return true if character is selected in any option list', function () {
        service.lists['Options List #1'].Specialist[0] = 1;
        expect(service.characterSelectedInOptions(Models.Specialist[0])).toBeTruthy();

        service.lists['Options List #2'].Specialist[0] = 1;
        expect(service.characterSelectedInOptions(Models.Specialist[0])).toBeTruthy();

        service.lists['Options List #1'].Specialist[0] = 0;
        expect(service.characterSelectedInOptions(Models.Specialist[0])).toBeTruthy();

        service.lists['Options List #2'].Specialist[0] = 0;
        expect(service.characterSelectedInOptions(Models.Specialist[0])).toBeFalsy();
      });
    });

    describe('options method', function () {
      it('should calculate the options for an option list', function () {
        service.faction = '';
        service.gameSize = 'Skirmish';
        service.resetLists();

        expect(service.options('Options List #1')).toEqual(0);
        expect(service.options('Options List #2')).toEqual(0);

        service.lists['Options List #1'].Infantry[0] = 1;
        expect(service.options('Options List #1')).toEqual(1);

        service.lists['Options List #1'].Infantry[0] = 2;
        expect(service.options('Options List #1')).toEqual(2);

        service.lists['Options List #1'].Specialist[0] = 1;
        expect(service.options('Options List #1')).toEqual(11);
      });
    });

    describe('ranks method', function () {
      it('should calculate the ranks for each type', function () {
        service.faction = '';
        service.gameSize = 'Patrol';
        service.resetLists();

        expect(service.ranks('Leader')).toEqual(0);
        expect(service.ranks('Infantry')).toEqual(0);
        expect(service.ranks('Specialist')).toEqual(0);

        service.lists['Core List'].Leader[0] = 1;
        expect(service.ranks('Leader')).toEqual(2);

        service.lists['Core List'].Infantry[0] = 1;
        expect(service.ranks('Infantry')).toEqual(1);

        service.lists['Core List'].Specialist[0] = 1;
        expect(service.ranks('Specialist')).toEqual(3);
      });
    });

    describe('resetLists method', function () {
      it('should not set the lists if gameSize is undefined', function () {
        service.faction = '';
        service.resetLists();

        expect(service.lists).toBeUndefined();
      });

      it('should not set the lists if faction is undefined', function () {
        service.gameSize = 'Patrol';
        service.resetLists();

        expect(service.lists).toBeUndefined();
      });

      it('should sets the lists if gameSize and faction are defined', function () {
        service.faction = '';
        service.gameSize = 'Patrol';
        service.resetLists();

        expect(service.lists).toBeDefined();
        expect(service.lists['Core List']).toBeDefined();
        expect(service.lists['Core List'].Leader.length).toEqual(1);
        expect(service.lists['Core List'].Leader[0]).toEqual(0);
        expect(service.lists['Core List'].Infantry.length).toEqual(1);
        expect(service.lists['Core List'].Infantry[0]).toEqual(0);
        expect(service.lists['Core List'].Specialist.length).toEqual(1);
        expect(service.lists['Core List'].Specialist[0]).toEqual(0);
      });

      it('should set the option lists if gameSize and faction are defined', function () {
        service.faction = '';
        service.gameSize = 'Skirmish';
        service.resetLists();

        expect(service.lists['Options List #1']).toBeDefined();
        expect(service.lists['Options List #1'].Infantry.length).toEqual(1);
        expect(service.lists['Options List #1'].Infantry[0]).toEqual(0);
        expect(service.lists['Options List #2']).toBeDefined();
        expect(service.lists['Options List #2'].Specialist.length).toEqual(1);
        expect(service.lists['Options List #2'].Specialist[0]).toEqual(0);
      });
    });

    describe('set method', function () {
    });

    describe('showList method', function () {
    });
  });

  describe('ModelsService', function () {
    var service, factions;

    beforeEach(inject(function (_factions_, Models) {
      factions = _factions_;
      service = Models;
    }));

    it('Leader, Infantry and Specialist properties should be undefined without load', function () {
      expect(service.Leader).toBeUndefined();
      expect(service.Infantry).toBeUndefined();
      expect(service.Specialist).toBeUndefined();
    });

    describe('load method', function () {
      it('should set Leader, Infantry and Specialist properties', function () {
        service.load('Goritsi');
        expect(service.Leader).toBe(factions.Goritsi.Leader);
        expect(service.Infantry).toBe(factions.Goritsi.Infantry);
        expect(service.Specialist).toBe(factions.Goritsi.Specialist);
        service.load('Hadross');
        expect(service.Leader).toBe(factions.Hadross.Leader);
        expect(service.Infantry).toBe(factions.Hadross.Infantry);
        expect(service.Specialist).toBe(factions.Hadross.Specialist);
      });

      it('without an argument should not set Leader, Infantry and Specialist properties ', function () {
        service.load('Hadross');
        service.load();
        expect(service.Leader).toBe(factions.Hadross.Leader);
        expect(service.Infantry).toBe(factions.Hadross.Infantry);
        expect(service.Specialist).toBe(factions.Hadross.Specialist);
      });
    });
  });
});
