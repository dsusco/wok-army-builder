describe('wokArmyBuilder.builder.army.model', function () {
  beforeEach(module('wokArmyBuilder'));

  describe('ModelController', function () {
    var controller, $scope, factions;

    beforeEach(inject(function ($controller, $rootScope, _factions_) {
      $scope = $rootScope.$new();
      $scope.number = 0;

      controller = $controller('ModelController', {
        $scope: $scope
      });

      factions = _factions_;
    }));

    describe('add function', function () {
      it('should update number', function () {
        $scope.model = factions.Goritsi.Leader[0];

        $scope.add('1');
        $scope.$digest();
        expect($scope.number).toEqual(1);

        $scope.add('2');
        $scope.$digest();
        expect($scope.number).toEqual(3);

        $scope.add('-3');
        $scope.$digest();
        expect($scope.number).toEqual(0);
      });
    });

    describe('setNotEnoughRanks event', function () {
      it('should set notEnoughRanks if it is the same model', function () {
        $scope.model = factions.Goritsi.Leader[0];

        expect($scope.notEnoughRanks).toBeUndefined();

        $scope.$broadcast('setNotEnoughRanks', $scope.model, true);
        expect($scope.notEnoughRanks).toBeTruthy();

        $scope.$broadcast('setNotEnoughRanks', $scope.model, false);
        expect($scope.notEnoughRanks).toBeFalsy();
      });

      it('should not set notEnoughRanks if it is a different model', function () {
        $scope.model = factions.Goritsi.Leader[0];

        expect($scope.notEnoughRanks).toBeUndefined();

        $scope.$broadcast('setNotEnoughRanks', factions.Goritsi.Leader[1], true);
        expect($scope.notEnoughRanks).toBeUndefined();

        $scope.$broadcast('setNotEnoughRanks', factions.Goritsi.Leader[1], false);
        expect($scope.notEnoughRanks).toBeUndefined();
      });
    });

    describe('setSelectedCharacter event', function () {
      it('should set selectedCharacter if it is the same model', function () {
        $scope.model = factions.Goritsi.Leader[0];

        expect($scope.selectedCharacter).toBeUndefined();

        $scope.$broadcast('setSelectedCharacter', $scope.model, true);
        expect($scope.selectedCharacter).toBeTruthy();

        $scope.$broadcast('setSelectedCharacter', $scope.model, false);
        expect($scope.selectedCharacter).toBeFalsy();
      });

      it('should not set selectedCharacter if it is a different model', function () {
        $scope.model = factions.Goritsi.Leader[0];

        expect($scope.selectedCharacter).toBeUndefined();

        $scope.$broadcast('setSelectedCharacter', factions.Goritsi.Leader[1], true);
        expect($scope.selectedCharacter).toBeUndefined();

        $scope.$broadcast('setSelectedCharacter', factions.Goritsi.Leader[1], false);
        expect($scope.selectedCharacter).toBeUndefined();
      });
    });

    describe('number', function () {
      beforeEach(function () {
        spyOn($scope, '$emit');
      });

      it('should set selectedCharacter and emit characterSelected event if a character', function () {
        $scope.model = factions.Goritsi.Leader[1];

        expect($scope.selectedCharacter).toBeUndefined();

        $scope.number = 1;
        $scope.$digest();
        expect($scope.selectedCharacter).toBeTruthy();
        expect($scope.$emit).toHaveBeenCalledWith('characterSelected', $scope.model, true);

        $scope.number = 0;
        $scope.$digest();
        expect($scope.selectedCharacter).toBeFalsy();
        expect($scope.$emit).toHaveBeenCalledWith('characterSelected', $scope.model, false);
      });

      it('should not set selectedCharacter or emit characterSelected event if not a character', function () {
        $scope.model = factions.Goritsi.Leader[0];

        expect($scope.selectedCharacter).toBeUndefined();

        $scope.number = 1;
        $scope.$digest();
        expect($scope.selectedCharacter).toBeUndefined();
        expect($scope.$emit).not.toHaveBeenCalledWith('characterSelected', $scope.model, true);

        $scope.number = 0;
        $scope.$digest();
        expect($scope.selectedCharacter).toBeUndefined();
        expect($scope.$emit).not.toHaveBeenCalledWith('characterSelected', $scope.model, false);
      });
    });
  });
});
