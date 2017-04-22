'use strict';

angular.module('sscApp.view1', ['ui.router'])
.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.model = {};
  $scope.model.viewStyles = ['Issue Stats', 'Chart', 'Table', 'Trend'];
  $scope.model.viewStylesIcons = ['fa fa-signal fa-small', 'icon-overview', 'fa fa-table fa-small', 'fa fa-line-chart fa-small'];

  $scope.model.groupAndFilterByAttrs = [
    {"guid":"1234", "name":"First element"}
  ]
}]);