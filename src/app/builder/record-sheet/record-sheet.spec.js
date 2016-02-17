describe('wokArmyBuilder.builder.recordSheet', function () {
  beforeEach(module('wokArmyBuilder'));

  describe('wokRecordSheetController', function () {
    var controller, $scope, Army, Models;

    beforeEach(inject(function ($controller, $rootScope, _Army_, _Models_) {
      $scope = $rootScope.$new();
      Army = _Army_;
      Models = _Models_;

      controller = $controller('RecordSheetTabController', {
        army: Army,
        models: Models
      });

      $scope.builder = controller;
    }));

    describe('army', function () {
      it('should be initialized to Army service', function () {
        expect(controller.army).toBe(Army);
      });
    });

    describe('models', function () {
      it('should be initialized to Models service', function () {
        expect(controller.models).toBe(Models);
      });
    });
  });
});
