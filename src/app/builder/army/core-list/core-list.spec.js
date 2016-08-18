describe('wokArmyBuilder.builder.army.coreList', function () {
  beforeEach(module('wokArmyBuilder'));

  describe('wokCoreListController', function () {
    var controller, $scope, Army, Models, gameSizes;

    beforeEach(function () {
      module('wokArmyBuilder.builder.army.coreList', function ($provide) {
        $provide.service('Army', function () {
          angular.extend(this, {
            ranks: jasmine.createSpy('ranks').and.callFake(function () { return 0; }),
            gameSize: 'Patrol',
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
      $scope.list = 'Core List';
      Army = _Army_;
      Models = _Models_;
      gameSizes = _gameSizes_;

      controller = $controller('CoreListController', {
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

      it('should call ranks when lists[Core List] array changed', function () {
        Army.lists['Core List'].Leader[0] = 1;
        $scope.$digest();

        expect(Army.ranks).toHaveBeenCalled();
        expect($scope.ranks.Leader).toEqual(0);
        expect($scope.$broadcast).toHaveBeenCalledWith('setNotEnoughRanks', Models.Leader[0], false);
      });
    });

    describe('maxRanks', function () {
      it('should return the maximum ranks for a given type', function () {
        expect($scope.maxRanks('Leader')).toEqual(2);
        expect($scope.maxRanks('Infantry')).toEqual(12);
        expect($scope.maxRanks('Specialist')).toEqual(2);
      });
    });

    describe('models', function () {
      it('should be initialized to Models service', function () {
        expect($scope.models).toBe(Models);
      });
    });

    describe('ranks', function () {
      it('should be initialized to object', function () {
        expect($scope.ranks).toEqual(jasmine.any(Object));
      });
    });

    describe('optionListCharacterSelected event', function () {
      beforeEach(function () {
        spyOn($scope, '$broadcast');
        $scope.$emit('optionListCharacterSelected', {}, false);
      });

      it('should broadcast a setSelectedCharacter event', function () {
        expect($scope.$broadcast).toHaveBeenCalledWith('setSelectedCharacter', {}, false);
      });
    });
  });
});
