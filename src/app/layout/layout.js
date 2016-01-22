angular
  .module('wokArmyBuilder.layout', [
    'ui.bootstrap',
    'ui.router'
  ])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('tabs', {
        url: '',
        views: {
          '': {
            controller: ['$scope', 'army', function ($scope, army) {
              $scope.active = [true, false, false];
              $scope.army = army;

              $scope.$watchGroup(['army.gameSize', 'army.faction'], function (values) {
                if (values.every(function (value) { return value !== undefined; })) {
                  $scope.enableArmy = true;
                  $scope.active[1] = true;
                }
              });
            }],
            templateUrl: 'layout/tabs.tpl.html'
          },
          'faction@tabs': {
            controller: ['$scope', 'factions', 'gameSizes', function ($scope, factions, gameSizes) {
              $scope.factions = factions;
              $scope.gameSizes = gameSizes;
            }],
            templateUrl: 'layout/faction.tpl.html'
          },
          'army@tabs': {
            templateUrl: 'layout/army.tpl.html'
          },
          'recordSheet@tabs': {
            templateUrl: 'layout/record-sheet.tpl.html'
          }
        }
      });
  }])

  .constant('factions', ['Goritsi', 'Hadross', 'Nasier', 'Shael Han', 'Teknes'])

  .constant('gameSizes', {
    Intro: {
      Leader: 2,
      Infantry: 12,
      Specialist: 2
    },
    Skirmish: {
      Leader: 3,
      Infantry: 18,
      Specialist: 2,
      Options: 6
    },
    Battle: {
      Leader: 5,
      Infantry: 24,
      Specialist: 4,
      Options: 12
    }
  });

