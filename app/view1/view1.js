'use strict';

angular.module('sscApp.view1', ['ui.router'])
.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.processKey = function processKey(evt) {
        console.log(new Date()+" key pressed "+evt);
      }

}]);