angular
  .module('wokArmyBuilder.builder.recordSheet', [
  ])

  .controller('RecordSheetTabController', ['Army', 'Models', function RecordSheetTabController(Army, Models) {
    angular.extend(this, {
      army: Army,
      models: Models
    });
  }])

  .directive('wokRecordSheet', function wokRecordSheet() {
    return {
      controller: 'RecordSheetTabController',
      controllerAs: 'recordSheetTab',
      scope: {},
      templateUrl: 'builder/record-sheet/record-sheet.tpl.html'
    };
  });
