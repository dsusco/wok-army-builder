angular
  .module('wokArmyBuilder.builder.army', [
    'wokArmyBuilder.builder.army.coreList',
    'wokArmyBuilder.builder.army.optionList',
    'wokArmyBuilder.builder.army.model'
  ])

  .controller('ArmyTabController', ['$scope', 'Army', function ArmyTabController($scope, Army) {
    angular.extend(this, {
      army: Army
    });

    $scope.$on('characterSelected', function (event, model, selected) {
      if (event.coreList) {
        $scope.$broadcast('coreListCharacterSelected', model, selected);
      } else {
        $scope.$broadcast('optionListCharacterSelected', model, Army.characterSelectedInOptions(model));
      }
    });
  }])

  .directive('wokArmy', function wokFaction() {
    return {
      controller: 'ArmyTabController',
      controllerAs: 'armyTab',
      scope: {},
      templateUrl: 'builder/army/army.tpl.html'
    };
  });
