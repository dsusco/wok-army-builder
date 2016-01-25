angular
  .module('wokArmyBuilder.layout', [
    'ui.bootstrap',
    'ui.router'
  ])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '',
        views: {
          '': {
            controller: ['$scope', 'army', 'gameSizes', function ($scope, army, gameSizes) {
              $scope.active = [true, false, false];
              $scope.army = army;
              $scope.gameSizes = gameSizes;

              $scope.$watchGroup(['army.gameSize', 'army.faction'], function (values) {
                if (values.every(function (value) { return value !== undefined; })) {
                  $scope.enableArmy = true;
                  $scope.active[1] = true;
                }
              });
            }],
            templateUrl: 'layout/tabs.tpl.html'
          },
          'faction@home': {
            controller: ['$scope', 'factions', function ($scope, factions) {
              $scope.factions = factions;
            }],
            templateUrl: 'layout/faction.tpl.html'
          },
          'army@home': {
            templateUrl: 'layout/army.tpl.html'
          },
          'recordSheet@home': {
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
    },
    Custom: {}
  })

  .filter('factionImageFilter', function () {
    return function (faction) {
      if (faction !== undefined) {
        faction = '/assets/images/' + faction.toLowerCase().replace(/[^0-9a-z]+/g, '-') + '.png';
      } else {
        faction = '';
      }

      return faction;
    };
  })

  .filter('optionsFilter', function () {
    return function (options) {
      options /= 3;

      return options.toFixed(1)
        .replace(/\.0$/, '')
        .replace(/0?\.3$/, '⅓')
        .replace(/0?\.7$/, '⅔');
    };
  });

