angular
  .module('wokArmyBuilder.models', [])

  .service('models', ['$http', function ($http) {
    var models = this;

    models.load = function (faction, successCallback) {
      if (faction !== undefined) {
        $http.get('/assets/json/' + faction.toLowerCase().replace(/[^0-9a-z]+/, '-') + '.json')
          .then(function (response) {
            angular.extend(models, { faction: faction }, response.data);
            successCallback();
          }, function (response) {
            console.log(response);
          });
      }
    };
  }]);
