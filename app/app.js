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
  'ngRoute',
  'ui.bootstrap',
  //'toastr',
  'ngSanitize',
  'sscApp.view1',
  'sscApp.view2',
  'sscApp.version'
])
.config(['$routeProvider', function($routeProvider) {
  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
  };
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.config(function() {
  "use strict";
  //angular.extend(toastrConfig, {
  //  closeButton: true,
  //  templates: {
  //    toast: 'views/templates/custom-toastr.html',
  //    progressbar: 'directives/progressbar/progressbar.html'
  //  }
  //})
});
