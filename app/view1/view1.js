'use strict';

angular.module('sscApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.processKey = function processKey(evt) {
        console.log(new Date()+" key pressed "+evt);
      }

}]);