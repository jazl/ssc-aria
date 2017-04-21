(function(angular){
    "use strict";
    var SSCDatepickerController = function SSCDatepickerController($scope, $element, $attrs, $timeout,$rootScope, $filter){
        $scope.datePickerModel = {
            disabled:false,
            format:null,
            placeholder:null,
            maxDate:''
        };
        var onFormatUpdate = function onFormatUpdate(format){
            $scope.datePickerModel.format = format;
            $scope.datePickerModel.placeholder = $scope.datePickerModel.disabled ? null: format;
        };
        if ($rootScope.userPreferences) {
            onFormatUpdate($rootScope.userPreferences.dateFormat);
        }
        $rootScope.$watch('userPreferences.dateFormat',onFormatUpdate);
        var open = function open(){
            if(!$scope.opened && $element.attr('disabled') !== 'disabled'){
                $timeout(function(){   //need timeout to avoid apply exception in plugin
                    $scope.opened = true;
                },0);
            }
        };
        var close = function close(){
            $timeout(function(){   //need timeout to avoid apply exception in plugin
                $scope.opened = false;
            },0);
        };
        $scope.onClick = function onClick() {
            open();
        };
        if ($attrs.opened) {
            $scope.$watch($attrs.opened, function () {
                if( $scope.opened ){
                    open();
                }else {
                    close();
                }
            });
        }
        if($attrs.ngDisabled){
            $scope.$watch("ngDisabled",function(newVal){
                $scope.datePickerModel.disabled = newVal;
                $scope.datePickerModel.placeholder = $scope.datePickerModel.disabled ? null: $scope.datePickerModel.format;
            });
        }

        if($attrs.maxDate){
            $scope.$watch("maxDate", function(isMaxDate){
                if(isMaxDate === 'today'){
                    $scope.datePickerModel.maxDate = $filter('date')(new Date(), 'yyyy/MM/dd');
                }
            });
        }

    };
    angular.module('sscApp').controller('SSCDatepickerController', SSCDatepickerController);
}(window.angular));

