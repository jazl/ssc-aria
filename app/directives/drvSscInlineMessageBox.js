angular.module('sscApp')
        .directive('drvSscInlineMessageBox', function ($compile) {
            'use strict';
            return {
                restrict: 'E',
                transclude: false,
                scope: {messageType: "@", html: "@", showMoreLink: "@", dissolve: '@'},
                template: "<div id='{{uniqueId}}' ng-class='messageClass' class='alert inline-message-box container-fluid inline-message-box-{{messageType}}' ng-show='showMessage'>" +
                        "<span drv-pfm-compile-to-element-safe-html='model.currentMessage'></span>" +
                        "<a ng-show='{{showMoreLink || true}}' id='btnShowMoreErrors' class='' href ng-click='showDetailsDialog()' >&nbsp;{{moreLink}}</a>" +
                        "<button id='btnCloseMsgDlg' class='close' ng-click='close()'>&times;</button>" +
                        "</div>",
                link: function (scope, ele) {
                    scope.mode = 'inline';
                    if (scope.html === "true") {
                        scope.$watch('model.currentMessage', function (html) {
                            if(html !== "") {
                                var span = ele.find('span').eq(0);
                                span.html(html); //replace html
                                $compile(span.contents())(scope);
                            }
                        });
                    }
                },
                controller: 'InlineMessageController'
            };
        });
