angular.module('sscApp').factory('messageQueueService', [function () {
    "use strict";
    
    var messageQueue = [];
    return {

        clear: function () {
            messageQueue = [];
        },
        insert: function (msg) {
            messageQueue.insert(0, msg);
        },
        getAll: function () {
            return messageQueue;
        }
    };
}]);