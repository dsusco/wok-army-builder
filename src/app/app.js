angular
  .module('wokArmyBuilder', [
    'ngRoute',
    'ui.bootstrap',
    'templates-app',
    'templates-common',
    'wokArmyBuilder.builder'
  ])

  .config(['$routeProvider', function config($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'BuilderController',
        controllerAs: 'builder',
        templateUrl: 'builder/builder.tpl.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }])

  .filter('optionsFilter', function optionsFilter() {
    return function (options) {
      options /= 3;

      return options.toFixed(1)
        .replace(/\.0$/, '')
        .replace(/0?\.3$/, '⅓')
        .replace(/0?\.7$/, '⅔');
    };
  })

  .filter('spinalCaseFilter', function spinalCaseFilter() {
    return function (faction) {
      if (faction !== undefined) {
        return String(faction).toLowerCase().replace(/[^0-9a-z]+/g, '-');
      }
    };
  });
