angular.module('sscApp').factory('logService', ['$log', function ($log) {
    "use strict";
    var ALL = 0;
    var DEBUG = 1;
    var INFO = 2;
    var WARN = 3;
    var ERROR = 4;

    var CURRENT_LEVEL = ERROR;

    var logEnabledFor = function (level) {
        return (level >= CURRENT_LEVEL);
    };

    var formatLogMsg = function (args) {
        if (args instanceof Object) {
            return JSON.stringify(args,null,'\t');
        }
        else {
            return args;
        }
    };
    return {

        LEVELS: {ALL: ALL, DEBUG: DEBUG, INFO: INFO, WARN: WARN, ERROR: ERROR},
        logEnabledFor: function (level) {
            return logEnabledFor(level);
        },
        setLevel: function (level) {
            CURRENT_LEVEL = level;
        },
        getLevel: function () {
            return CURRENT_LEVEL;
        },
        debug: function () {
            var args = Array.prototype.slice.call(arguments, 0,arguments.length);
            if (logEnabledFor(DEBUG)) {
                $log.log(formatLogMsg(args));
            }
        },
        info: function () {
            var args = Array.prototype.slice.call(arguments, 0,arguments.length);
            if (logEnabledFor(INFO)) {
                $log.info(formatLogMsg(args));
            }
        },
        warn: function () {
            var args = Array.prototype.slice.call(arguments, 0,arguments.length);
            if (logEnabledFor(WARN)) {
                $log.warn(formatLogMsg(args));
            }
        },
        error: function () {
            var args = Array.prototype.slice.call(arguments, 0,arguments.length);
            if (logEnabledFor(ERROR)) {
                $log.error(formatLogMsg(args));
            }
        }
    };
}]);