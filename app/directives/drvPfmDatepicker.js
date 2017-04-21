angular.module('sscApp').directive('drvPfmDatepicker', function ($filter) {
    'use strict';

    return {
        restrict: 'AE',
        require: 'ngModel',
        scope: { format: '=', opened: '@',ngDisabled:'=', maxDate:'@', placement:'@', fieldName:'@', invalidMessage:'@'},
        template: '<div><div class="ssc-date-picker"  ng-click="onClick($event)">' +
                '<i class="icon-date" ng-class="{\'disabled\':datePickerModel.disabled}"></i>' +
                '<input type="text" drv-pfm-date-validator placement="{{placement}}" uib-datepicker-popup="{{datePickerModel.format}}" ng-blur="renderOnBlur()" ' +
                'max="datePickerModel.maxDate" datepicker-append-to-body="true" is-open="opened" ng-change="handleInputChange()" ng-disabled="datePickerModel.disabled" ' +
                'ng-model="datePickerModel.dateString" field-name="{{fieldName}}" invalid-message="{{invalidMessage}}" ' +
                'placeholder="{{datePickerModel.placeholder}}" class="input-small-field" max="datePickerModel.maxDate" /></div></div>',
        replace: true,
        controller: 'SSCDatepickerController',
        link: function link(scope, iElement, iAttrs, controller) {
            $(iElement).on("keyup", function(evt){
                console.log(new Date()+" evt.keyCode="+evt.keyCode);
            })
            var filterFunc = function (value) {
                return $filter('date')(value, scope.format ? scope.format:scope.datePickerModel.format);
            };
            controller.$formatters.push(filterFunc);
            scope.handleInputChange = function handleInputChange() {
                if(typeof scope.datePickerModel.dateString === 'string'){
                    var dt = new Date(scope.datePickerModel.dateString);
                    var val = dt;
                    if(isNaN(dt.valueOf())){
                        val = scope.datePickerModel.dateString;
                    }
                    controller.$setViewValue(val);
                }else {
                    controller.$setViewValue(scope.datePickerModel.dateString);
                }
            };
            controller.$render = function () {
                var val = controller.$viewValue;
                if (val && (scope.datePickerModel.dateString !== val)) {
                    if (val instanceof Date && !isNaN(val.valueOf())) {
                        val = filterFunc(controller.$viewValue);
                    }
                    scope.datePickerModel.dateString = new Date(val);
                }
            };
            scope.renderOnBlur = function renderOnBlur(){
                if(controller.$dirty && controller.$valid && !scope.opened){
                    controller.$render();
                }
            };
        }
    };
});
