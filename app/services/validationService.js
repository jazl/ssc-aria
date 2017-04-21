/*
 * (C) Copyright 2013 Hewlett-Packard Development Company, L.P.
 */
angular.module('sscApp').factory('validationService', ['localeService', '$compile', '$timeout', function (localeService, $compile, $timeout) {
    "use strict";

    var safeGetLocale = function safeGetLocale(key, param) {
        if (localeService.locale[key]) {
            return localeService.locale[key].format(param);
        }
        return "Invalid value"; //should not happen only if strings are not defined in the resources
    };


    var service = {
        /*links an error object to the element passed (adds after) and returns the newly created error element*/
        attachErrorElement: function attachErrorElement(scope, elm, attrs, ctrl, customMsg) {
            var msg = '';
            var fieldName = '';
            var placement = 'bottom';

            if(msg === '' && customMsg) {
                msg = customMsg;
            }
            else {
                if (angular.isDefined(attrs.invalidMessage)) {
                    msg = attrs.invalidMessage;
                }
            }
            if (angular.isDefined(attrs.fieldName)) {
                fieldName = attrs.fieldName;
            }
            if (msg === '') {
                msg = 'form.invalid.general';
            }
            msg = safeGetLocale(msg, fieldName);

            if (angular.isDefined(attrs.placement)) {
               placement = attrs.placement;
            }
            var field = '<div class="validation-container"><div class="validation-error" popover-trigger="openTrigger" popover-placement="' +placement+ '" uib-popover="' + msg + '">&nbsp;</div></div>';
            var errorElement = angular.element(field);
            $compile(errorElement)(scope);
            if ('top' === placement) {
                elm.before(errorElement);
            } else {
                elm.after(errorElement);
            }

            return errorElement.find('.validation-error');
        },
        attachValidator: function attachValidator(scope, elm, ctrl, regexp, validityField) {
            var forceValidation = true;
            ctrl.$parsers.unshift(function (viewValue) {

                try {
                    if (!viewValue || regexp.test(viewValue)) {
                        if (forceValidation || ctrl.$invalid) {
                            ctrl.$setValidity(validityField, true);
                            service.triggerCloseValidationPopover(scope, elm);
                            forceValidation = false;
                        }
                        return viewValue;
                    } else {
                        if (forceValidation || ctrl.$valid) {
                            ctrl.$setValidity(validityField, false);
                            service.triggerOpenValidationPopover(scope, elm);
                            forceValidation = false;
                        }
                        return viewValue;
                    }
                } finally {
                    /*this handles the end case of making the field empty, which causes the ctr
                    * to be valid. then in the next entered char, if its invalid the validity is not
                    * set becase it is already valid*/
                    if (viewValue === '') {
                        forceValidation = true;
                    }
                }
            });
        },
        triggerCloseValidationPopover: function triggerCloseValidationPopover(scope, elm) {
            $timeout(function closeValidationPopover() {
                elm.trigger('closeTrigger');
            });
        },
        triggerOpenValidationPopover: function triggerOpenValidationPopover(scope, elm) {
            $timeout(function openValidationPopover() {
                elm.trigger('openTrigger');
            });
        }
    };

    return service;
}]);