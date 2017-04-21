angular.module('sscApp')
        .directive('drvPfmCompileToElementSafeHtml', ['$compile', '$parse', '$sanitize', function ($compile, $parse, $sanitize) {
            'use strict';
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    scope.$watch(attr.drvPfmCompileToElementSafeHtml, function() {
                        var content = $sanitize(attr.drvPfmCompileToElementSafeHtml);
                        element.html($parse(content)(scope));
                        $compile(element.contents())(scope);
                    }, true);
                }
            };
        }]);
