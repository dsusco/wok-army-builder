describe('ArmyBuilderCtrl', function () {
  describe('isCurrentUrl', function () {
    var ArmyBuilderCtrl, $location, $scope;

    beforeEach(module('wokArmyBuilder'));

    beforeEach(inject(function ($controller, _$location_, $rootScope) {
      $location = _$location_;
      $scope = $rootScope.$new();
      ArmyBuilderCtrl = $controller('ArmyBuilderCtrl', { $location: $location, $scope: $scope });
    }));

    it('should pass a dummy test', inject(function () {
      expect(ArmyBuilderCtrl).toBeTruthy();
    }));
  });
});
