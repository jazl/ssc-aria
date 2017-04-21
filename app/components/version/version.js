'use strict';

angular.module('sscApp.version', [
  'sscApp.version.interpolate-filter',
  'sscApp.version.version-directive'
])

.value('version', '0.1');
