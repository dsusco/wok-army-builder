describe('wokArmyBuilder.builder.army.optionList', function () {
  beforeEach(module('wokArmyBuilder'));

  describe('wokOptionListController', function () {
    var controller, $scope, Army, Models, gameSizes;

    beforeEach(function () {
      module('wokArmyBuilder.builder.army.coreList', function ($provide) {
        $provide.service('Army', function () {
          angular.extend(this, {
            options: jasmine.createSpy('options').and.callFake(function () { return 0; }),
            gameSize: 'Skirmish',
            lists: {
              'Core List': {
                Leader: [0],
                Infantry: [0],
                Specialist: [0]
              },
              'Options List #1': {
                Infantry: [0],
                Specialist: [0]
              },
              'Options List #2': {
                Infantry: [0],
                Specialist: [0]
              }
            }
          });
        });
      });
    });

    beforeEach(inject(function ($controller, $rootScope, _Army_, _Models_, _gameSizes_) {
      $scope = $rootScope.$new();
      $scope.list = 'Options List #1';
      Army = _Army_;
      Models = _Models_;
      gameSizes = _gameSizes_;

      controller = $controller('OptionListController', {
        $scope: $scope,
        Army: Army,
        Models: Models,
        gameSizes: gameSizes
      });
    }));

    describe('army', function () {
      beforeEach(function () {
        spyOn($scope, '$broadcast');
        Models.load('Goritsi');
      });

      it('should be initialized to Army service', function () {
        expect($scope.army).toEqual(Army);
      });

      it('should call options when lists[Options List #] arrays change', function () {
        Army.lists['Options List #1'].Infantry[0] = 1;
        $scope.$digest();

        expect(Army.options).toHaveBeenCalled();
        expect($scope.options).toEqual(0);
        expect($scope.$broadcast).toHaveBeenCalledWith('setNotEnoughRanks', Models.Infantry[0], false);
      });
    });

    describe('maxOptions', function () {
      it('should return the maximum options for a given list', function () {
        expect($scope.maxOptions()).toEqual(6);
      });
    });

    describe('models', function () {
      it('should be initialized to Models service', function () {
        expect($scope.models).toBe(Models);
      });
    });

    describe('options', function () {
      it('should be initialized to 0', function () {
        expect($scope.options).toEqual(0);
      });
    });

    describe('coreListCharacterSelected event', function () {
      beforeEach(function () {
        spyOn($scope, '$broadcast');
        $scope.$emit('coreListCharacterSelected', {}, false);
      });

      it('should broadcast a setSelectedCharacter event', function () {
        expect($scope.$broadcast).toHaveBeenCalledWith('setSelectedCharacter', {}, false);
      });
    });
  });
});
