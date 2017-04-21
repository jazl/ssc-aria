angular.module('sscApp')
        .directive('drvPfmDateValidator', function (validationService) {
            'use strict';
            var DATE_REGEXP = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/;
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    elm = validationService.attachErrorElement(scope, elm, attrs);
                    scope.ngModelCtrl = ctrl;
                    var parserValidator = function parserValidator(viewValue) {
                        var testValue = viewValue ?viewValue.toString():'';
                        if(typeof testValue === "string"){
                            testValue = new Date(testValue);
                        }
                        if (!viewValue || !isNaN(testValue.valueOf()) && DATE_REGEXP.test(testValue.toISOString())) {
                            ctrl.$setValidity('date1', true);
                            validationService.triggerCloseValidationPopover(scope, elm);
                            return viewValue;
                        } else {
                            ctrl.$setValidity('date1', false);
                            validationService.triggerOpenValidationPopover(scope, elm);
                            return viewValue;
                        }
                    };
                    ctrl.$parsers.unshift(parserValidator);

                    scope.$watch('ngModelCtrl.$parsers', function () {        //make sure our validator is first
                        var index = ctrl.$parsers.indexOf(parserValidator);
                        if (index !== 0) {
                            if (index !== -1) {
                                ctrl.$parsers.splice(index, 1);
                            }
                            ctrl.$parsers.unshift(parserValidator);
                        }
                    });
                }
            };
        });