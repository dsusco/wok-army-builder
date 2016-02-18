describe('wokArmyBuilder.builder.actions', function () {
  beforeEach(module('wokArmyBuilder'));

  describe('ModalController', function () {
    var controller, $scope, $location, $httpParamSerializer, Army;

    beforeEach(inject(function ($controller, $rootScope, _$location_, _$httpParamSerializer_, _Army_) {
      $scope = $rootScope.$new();
      $location = _$location_;
      $httpParamSerializer = _$httpParamSerializer_;
      Army = _Army_;

      controller = $controller('ModalController', {
        $location: $location,
        $httpParamSerializer: $httpParamSerializer,
        Army: Army
      });

      $scope.builder = controller;
    }));

    describe('url', function () {
      beforeEach(function () {
        spyOn($location, 'path');
      });

      it('should call $location.path', function () {
        controller.url();
        expect($location.path).toHaveBeenCalled();
      });
    });
  });

  describe('ActionsController', function () {
    var controller, $scope, $uibModal;

    beforeEach(inject(function ($controller, $rootScope, _$uibModal_) {
      $scope = $rootScope.$new();
      $uibModal = _$uibModal_;

      controller = $controller('ActionsController', {
        $uibModal: $uibModal
      });

      $scope.builder = controller;
    }));

    describe('share', function () {
      beforeEach(function () {
        spyOn($uibModal, 'open');
      });

      it('should call $uibModal.open', function () {
        controller.share();
        expect($uibModal.open).toHaveBeenCalled();
      });
    });
  });
});
