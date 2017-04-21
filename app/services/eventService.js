angular.module('sscApp').factory('eventService', ['$rootScope', function ($rootScope) {
    "use strict";
    var eventService = {};
    eventService.message = '';
    eventService.eventName = '';

    // Dispatches an event to all scope listeners
    eventService.dispatch = function dispatch(evName, data) {
        this.message = data;
        this.eventName = evName;
        $rootScope.$broadcast(this.eventName, data);
    };
    /*
    *Pass in your current scope (DO NOT PASS Rootstcope)
    * Event is sent up to parent.
     */
    eventService.emit = function emit(scope, evName, data) {
        scope.$emit(evName, data);
    };
    eventService.on = function on(eventName,handler){//mostly for user by services
        $rootScope.$on(eventName,handler);
    };
    eventService.eventTypes = {
        local:{
            SAVE_SUCCESS:'SAVE_SUCCESS'
        },
        PERMISSION_MODEL_CHANGED: 'PERMISSION_MODEL_CHANGED',
        LOGIN_CONFIRMED: 'LOGIN_CONFIRMED',
        LOGIN_REQUIRED: 'LOGIN_REQUIRED',
        HTTP_ERROR: 'HTTP_ERROR',
        STEP_VALIDATION: 'STEP_VALIDATION',
        REGISTER_WIZ_PAGE: 'REGISTER_WIZ_PAGE',
        GENERAL_ERROR: 'GENERAL_ERROR',
        CLOSE_POPUP: 'CLOSE_POPUP',
        DISPLAY_INLINE_MESSAGE: 'DISPLAY_INLINE_MESSAGE',
        WIZ_INIT_STEP: 'WIZ_INIT_STEP'
    };

    return eventService;
}]);