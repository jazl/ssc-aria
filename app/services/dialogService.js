
angular.module('sscApp').factory('dialogService', ['$uibModal', '$filter', function ($uibModal,$filter) {
    "use strict";
    var dialogService = {};
    var messageBoxTemplate = '../platform/views/partials/message.html';
    var messageBoxControllerFactory = function messageBoxControllerFactory(buttons, message, title, displayHtml) {
        return ['$scope', '$uibModalInstance', function (scope, modal) {
            scope.buttons = buttons;
            scope.message = message;
            scope.title = title;
            scope.displayHtml = displayHtml;
            scope.close = function close(result) {
                modal.close(result);
            };
        }];
    };
    /**
     * Usage:
     pass a template url and a controller name for use with your partial view for dialog.
     to get  data back create a JSON model objects (model ={}} and put all dialog bindings to properties on it.
     i.e model.text. this will be passed as a parameter to the thenFunction. see showcase for more info.
     * @param isModal
     * @param url
     * @param dialogClz dialog panel class
     * @param controllerRef - can be string name for function with format function ($scope, dialog) {}
     * @param thenFunction - cb after dialog is closed, model will be passed to it.   function (model) {}
     * @param useKeyboard - allow use of keyboard to close dialog. defaults to true
     */
    dialogService.open = function open(isModal, url, size, dialogClz, controllerRef, thenFunction, useKeyboard) {
        this.modal = isModal;
        var that = this;
        var opts = {
            animation: false,
            backdrop: isModal ? 'static' : false,
            keyboard: angular.isDefined(useKeyboard) ? useKeyboard : true,
            templateUrl: url,
            controller: controllerRef,
            windowClass: dialogClz,
            size:size
        };
        var d = $uibModal.open(opts);
        d.result.then(function (model) {
            that.modal = false;
            if (thenFunction) {
                thenFunction(model);//call the cb
            }
            return model;
        },function rejected(){
            that.modal = false;
        });
        return d;
    };
    /**
     * For alert messages to user. pass a then function as a callback to get a handle on dismiss
     * @param thenFunction   =- function (model) {}
     * @param title
     * @param msg
     */
    dialogService.alertBox = function alertBox(title, msg) {
        var buttons = [
            {result: 'ok', label: $filter('i18n')('button.ok'), cssClass: 'primary-cta'}
        ];
        var opts = {
            backdrop: 'static',
            keyboard: true,
            templateUrl: messageBoxTemplate,
            controller: messageBoxControllerFactory(buttons,msg,title)
        };

        return $uibModal.open(opts);
    };

    /**
     * Displays a confirmation window which allows user to select ok or cancel
     * @param title
     * @param msg
     * @param displayHtml (NOTE: indicates that the included html is safe to be rendered in the dialog - DO NOT set this flag if message includes external data such as user input)
     */
    dialogService.confirm = function confirm(title, msg, displayHtml, btnLabels) {
        var buttons = [
            {result: 'cancel',label: btnLabels && btnLabels.cancel? btnLabels.cancel:$filter('i18n')('button.cancel'),
                cssClass: 'btn secondary-cta'},
            {result: 'ok', label: btnLabels && btnLabels.ok? btnLabels.ok:$filter('i18n')('button.ok'), cssClass: 'primary-cta'}
        ];

        var opts = {
            backdrop: 'static',
            keyboard: true,
            templateUrl: messageBoxTemplate,
            controller: messageBoxControllerFactory(buttons,msg,title,(displayHtml? true: false) )
        };
        return $uibModal.open(opts).result;
    };

    return dialogService;
}]);
