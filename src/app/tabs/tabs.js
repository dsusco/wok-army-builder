angular
  .module('wokArmyBuilder.tabs', [
    'ui.bootstrap',
    'ui.router'
  ])
  .config(['$stateProvider', function tabsConfig($stateProvider) {
    $stateProvider
      .state('tabs', {
        url: '',
        views: {
          '': {
            templateUrl: 'tabs/tabs.tpl.html'
          },
          'faction@tabs': {
            templateUrl: 'tabs/faction.tpl.html'
          },
          'army@tabs': {
            templateUrl: 'tabs/army.tpl.html'
          },
          'recordSheet@tabs': {
            templateUrl: 'tabs/record-sheet.tpl.html'
          }
        }
      });
  }]);
