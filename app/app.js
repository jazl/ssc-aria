'use strict';

angular.module('platform.directive', []);
angular.module('platform.service', []);
angular.module('platform.filter', []);
angular.module('platform.util.progress', []);
angular.module('platform.util.progress', []);
angular.module('platform.util.graphic', []);
angular.module('platform.util', []);
angular.module('platform', []);

angular.module('sscApp.filter', []);
angular.module('sscApp.resource', []);
angular.module('sscApp.service', []);
angular.module('sscApp.util', []);
angular.module('sscApp.directive', ['sscApp.service']);

// Declare app level module which depends on views, and components

angular.module('sscApp', [
  'ui.router',
  'ui.bootstrap',
  'ngSanitize',
  'sscApp.view1',
  'sscApp.view2',
  'sscApp.version'
])
.config(function($stateProvider) {
  var view1State = {
    name: 'view1',
    url: '/view1',
    templateUrl: 'view1/view1.html'
  }

  var view2State = {
    name: 'view2',
    url: '/view2',
    templateUrl: 'view2/view2.html'
  }

  $stateProvider.state(view1State);
  $stateProvider.state(view2State);
});