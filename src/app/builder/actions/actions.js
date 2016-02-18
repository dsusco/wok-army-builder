angular
  .module('wokArmyBuilder.builder.actions', [
  ])

  .controller('ModalController', ['$location', '$httpParamSerializer', 'Army', function ($location, $httpParamSerializer, Army) {
    var modal = this;

    function url() {
      return $location.path() + '?' + $httpParamSerializer(angular.fromJson(angular.toJson(Army)));
    }

    angular.extend(modal, {
      url: url
    });
  }])

  .controller('ActionsController', ['$uibModal', function ActionsController($uibModal) {
    var actions = this;

    function share() {
      $uibModal.open({
        controller: 'ModalController',
        controllerAs: 'modal',
        templateUrl: 'builder/actions/modal.tpl.html'
      });
    }

    angular.extend(actions, {
      share: share
    });
  }])

  .directive('wokActions', function wokActions() {
    return {
      controller: 'ActionsController',
      controllerAs: 'actions',
      scope: {},
      templateUrl: 'builder/actions/actions.tpl.html'
    };
  });
