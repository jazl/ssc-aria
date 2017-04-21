/*jshint unused: false*/
angular.module('sscApp')
    .controller('InlineMessageController', ['$rootScope', '$scope', 'sscEventService', 'dialogService', 'logService', 'appResources', 'localeService', '$attrs', '$timeout','toastr', 'messageQueueService',
        function ($rootScope, $scope, sscEventService, dialogService, logService, appResources, localeService, $attrs, $timeout, toastr, messageQueueService) {
            'use strict';

            var closeMessageEventType;
            var displayMessageEventType;
            var buttonText;
            var dissolve = $scope.dissolve !== undefined ? $scope.dissolve === "true" : false;
            $scope.uniqueId = "hint_" + Math.floor(Math.random() * 1000000) + 100;

            console.log('$scope.uniqueId = '+$scope.uniqueId);

            if ($attrs.messageType === 'WARNING') {
                closeMessageEventType = sscEventService.eventTypes.CLOSE_WARNING_MESSAGE;
                displayMessageEventType = sscEventService.eventTypes.DISPLAY_WARNING_MESSAGE;
                buttonText = 'button.warnings';
                $scope.messageClass = 'alert-warning';
            } else if ($attrs.messageType === 'HINT') {
                closeMessageEventType = sscEventService.eventTypes.CLOSE_HINT_MESSAGE;
                displayMessageEventType = sscEventService.eventTypes.DISPLAY_HINT_MESSAGE;
                buttonText = 'button.hints';
                $scope.messageClass = 'alert-success';
            } else {
                closeMessageEventType = sscEventService.eventTypes.CLOSE_INLINE_MESSAGE;
                displayMessageEventType = sscEventService.eventTypes.DISPLAY_INLINE_MESSAGE;
                buttonText = 'button.errors';
                $scope.messageClass = 'alert-danger';
            }

            var updateMoreLink = function () {
                // TODO: dev only!! dev only!! dev only!!
                // TODO: dev only!! dev only!! dev only!!
                // TODO: dev only!! dev only!! dev only!!
                $scope.moreLink = 'more...';        // localeService.locale["button.more"]; //default
                // TODO: dev only!! dev only!! dev only!!
                // TODO: dev only!! dev only!! dev only!!
                // TODO: dev only!! dev only!! dev only!!
                if ($scope.messageQueue.length > 1) {
                    //$scope.moreLink = localeService.locale[buttonText].format($scope.messageQueue.length); //default
                }
            };

            var reset = function () {
                $scope.model = {currentMessage: ''};
                $scope.showMessage = false;
                $scope.messageQueue = [];
                updateMoreLink();
            };

            $scope.close = function (notify) {
                $scope.showMessage = false;
                //clear errors
                reset();
                //notify any other inline message boxes to close
                if(notify) {
                    sscEventService.dispatch(closeMessageEventType, null);
                }
            };

            $scope.$on(closeMessageEventType, function (event, data) {
                /*other instances can exist so if they are shown*/
                if ($scope.showMessage) {
                    $scope.close();
                }
            });

            $scope.$on(displayMessageEventType, function (event, data) {
                if (data && data.message) {
                    if (data.unique && $scope.noSuchMessage(data, $scope.messageQueue) || !data.unique) {
                        $scope.model.currentMessage = data.message;
                        $scope.messageQueue.insert(0, {message: data.message, details: data.details, time: data.time});
                        messageQueueService.insert({message: data.message, details: data.details, time: data.time});
                        updateMoreLink();
                        $scope.showMessage = true;

                        console.log('$scope.messageQueue = '+JSON.stringify($scope.messageQueue));

                        if (dissolve === true) {
                            //cancel previous
                            if (angular.isDefined($scope.timeout)) {
                                $timeout.cancel($scope.timeout);
                            }
                            $('#' + $scope.uniqueId).stop().fadeTo(500, 1);//reset

                            $scope.timeout = $timeout(function dissolveBar() {
                                $('#' + $scope.uniqueId).fadeOut(3000, function dissolveComplete() {
                                    $scope.close(false);
                                });

                            }, 10000);

                        }
                        var toastrRef;
                        if(displayMessageEventType===sscEventService.eventTypes.DISPLAY_WARNING_MESSAGE) {
                          toastrRef = toastr.warning;
                        }
                        else if (displayMessageEventType===sscEventService.eventTypes.DISPLAY_HINT_MESSAGE) {
                          toastrRef = toastr.info;
                        }
                        else {
                          toastrRef = toastr.error;
                        }
                        toastrRef($scope.model.currentMessage, null, {
                          onShown: function(toastr) {
                            console.log('**** shown at '+new Date());
                          },
                          onHidden: function(toastr) {
                            //$scope.close();
                          }
                        });
                    }
                }
            });

            $scope.noSuchMessage = function (data, messageQueue) {
                var arrayLength = messageQueue.length;
                for (var i = 0; i < arrayLength; i++) {
                    if ((messageQueue[i].message === data.message) && (messageQueue[i].details === data.details)) {
                        return false;
                    }
                }
                return true;
            };

            var parentScope = $scope;
            $scope.showDetailsDialog = function () {
                var $inlineScope = $scope;
                return dialogService.open(true, 'views/partials/inlinemessage.html', 'medium', 'modal  inline-error-box',
                    ['$scope', '$uibModalInstance',
                        function ($scope, dialog) {
                            //internal scope
                            $scope.messageQueue = messageQueueService.getAll(); // parentScope.messageQueue;
                            $scope.close = function close() {
                                dialog.close();
                            };
                        }
                    ]);
            };
            reset();
        }]);


