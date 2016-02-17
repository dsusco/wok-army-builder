describe('wokArmyBuilder.builder.army', function () {
  beforeEach(module('wokArmyBuilder'));

  describe('wokArmyController', function () {
    var controller, $scope, Army;

    beforeEach(function () {
      module('wokArmyBuilder.builder.army', function ($provide) {
        $provide.service('Army', function () {
          angular.extend(this, {
            characterSelectedInOptions: jasmine.createSpy('characterSelectedInOptions').and.callFake(function () { return false; })
          });
        });
      });
    });

    beforeEach(inject(function ($controller, $rootScope, _Army_) {
      $scope = $rootScope.$new();
      Army = _Army_;

      controller = $controller('ArmyTabController', {
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

    describe('characterSelected event', function () {
      beforeEach(function () {
        spyOn($scope, '$broadcast');
        $scope.$emit('characterSelected', {}, false);
      });

      it('from an option list should broadcast an optionListCharacterSelected event', function () {
        expect($scope.$broadcast).toHaveBeenCalledWith('optionListCharacterSelected', {}, false);
        expect(Army.characterSelectedInOptions).toHaveBeenCalled();
      });
    });
  });
});
