angular
  .module('wokArmyBuilder.builder.faction', [
  ])

  .controller('FactionTabController', ['$scope', 'Army', 'Models', 'factions', 'gameSizes', function FactionTabController($scope, Army, Models, factions, gameSizes) {
    angular.extend(this, {
      army: Army,
      factions: Object.getOwnPropertyNames(factions),
      gameSizes: gameSizes
    });

    $scope.$watch('factionTab.army.gameSize', Army.setLists);

    $scope.$watch('factionTab.army.faction', function watchArmyFaction(faction) {
      Models.load(faction);
      Army.setLists();
    });
  }])

  .directive('wokFaction', function wokFaction() {
    return {
      controller: 'FactionTabController',
      controllerAs: 'factionTab',
      scope: {},
      templateUrl: 'builder/faction/faction.tpl.html'
    };
  });
