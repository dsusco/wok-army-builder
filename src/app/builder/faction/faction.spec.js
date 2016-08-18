describe('wokArmyBuilder.builder.faction', function () {
  beforeEach(module('wokArmyBuilder'));

  describe('wokFactionController', function () {
    var controller, $scope, Army, Models, factions, gameSizes;

    beforeEach(function () {
      module('wokArmyBuilder.builder.faction', function ($provide) {
        $provide.service('Army', function () {
          angular.extend(this, {
            resetLists: jasmine.createSpy('resetLists').and.callFake(function () {})
          });
        });

        $provide.service('Models', function () {
          angular.extend(this, {
            load: jasmine.createSpy('load').and.callFake(function () {})
          });
        });
      });
    });

    beforeEach(inject(function ($controller, $rootScope, _Army_, _Models_, _factions_, _gameSizes_) {
      $scope = $rootScope.$new();
      Army = _Army_;
      Models = _Models_;
      factions = _factions_;
      gameSizes = _gameSizes_;

      controller = $controller('FactionTabController', {
        $scope: $scope,
        Army: Army,
        Models: Models,
        factions: factions,
        gameSizes: gameSizes
      });

      $scope.builder = controller;
    }));

    describe('army', function () {
      it('should be initialized to Army service', function () {
        expect(controller.army).toBe(Army);
      });
    });

    describe('factions', function () {
      it('should be initialized to array of faction names', function () {
        expect(controller.factions).toEqual(Object.getOwnPropertyNames(factions));
      });
    });

    describe('gameSizes', function () {
      it('should be initialized to gameSizes', function () {
        expect(controller.gameSizes).toEqual(gameSizes);
      });
    });

    it('should call Army.resetLists when gameSize is changed', function () {
      Army.gameSize = 'Patrol';
      $scope.$digest();

      expect(Army.resetLists).toHaveBeenCalled();
    });

    it('should call Army.resetLists and Models.load when faction is changed', function () {
      Army.faction = 'Goritsi';
      $scope.$digest();

      expect(Models.load).toHaveBeenCalled();
      expect(Army.resetLists).toHaveBeenCalled();
    });
  });
});
