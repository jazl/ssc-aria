angular.module('sscApp').factory('sscEventService', ['eventService', 'localeService', function (eventService, localeService) {
    "use strict";
    var sscEventService = Object.create(eventService); //extend platform service

    sscEventService.eventTypes.SESSION_TIMEOUT_PENDING = "SESSION_TIMEOUT_PENDING";
    sscEventService.eventTypes.USER_DETAILS_RECEVEIED = "USER_DETAILS_RECEVEIED";
    sscEventService.eventTypes.DISPLAY_WARNING_MESSAGE = "DISPLAY_WARNING_MESSAGE";
    sscEventService.eventTypes.DISPLAY_HINT_MESSAGE = "DISPLAY_HINT_MESSAGE";
    sscEventService.eventTypes.CLOSE_INLINE_MESSAGE = "CLOSE_INLINE_MESSAGE";
    sscEventService.eventTypes.CLOSE_WARNING_MESSAGE = "CLOSE_WARNING_MESSAGE";
    sscEventService.eventTypes.CLOSE_HINT_MESSAGE = "CLOSE_HINT_MESSAGE";
    sscEventService.eventTypes.REFRESH_DASHBOARD = 'REFRESH_DASHBOARD';
    sscEventService.eventTypes.VERSION_ADDED = 'VERSION_ADDED';
    sscEventService.eventTypes.HANDLE_STATE_CHANGED = 'HANDLE_STATE_CHANGED';
    sscEventService.eventTypes.RISK_PROGRESS_EVENT = 'RISK_PROGRESS_EVENT';
    sscEventService.eventTypes.GET_TRENDS = 'GET_TRENDS';
    sscEventService.eventTypes.REPORT_LIBRARY_UPDATED = 'REPORT_LIBRARY_UPDATED';
    sscEventService.eventTypes.REPORT_DEFINITION_UPDATED = 'REPORT_DEFINITION_UPDATED';
    sscEventService.eventTypes.LDAP_CONFIG_UPDATED = 'LDAP_CONFIG_UPDATED';
    sscEventService.eventTypes.VARIABLE_UPDATED = 'VARIABLE_UPDATED';
    sscEventService.eventTypes.PERFORMANCE_INDICATOR_UPDATED = 'PERFORMANCE_INDICATOR_UPDATED';
    sscEventService.eventTypes.CUSTOM_TAG_UPDATED = 'CUSTOM_TAG_UPDATED';
    sscEventService.eventTypes.CUSTOM_TAG_EXTENDED = 'CUSTOM_TAG_EXTENDED';
    sscEventService.eventTypes.REFRESH_SAVED_REPORTS = 'REFRESH_SAVED_REPORTS';
    sscEventService.eventTypes.FILTER_SAVED_REPORTS = 'FILTER_SAVED_REPORTS';
    sscEventService.eventTypes.NEW_SAVED_REPORT = 'NEW_SAVED_REPORT';
    sscEventService.eventTypes.REPORT_STATUS_CHANGED = 'REPORT_STATUS_CHANGED';
    sscEventService.eventTypes.OPEN_BUG_FORM = 'OPEN_BUG_FORM';
    sscEventService.eventTypes.CLOSE_BUG_FORM = 'CLOSE_BUG_FORM';
    sscEventService.eventTypes.UPDATE_FIX_SELECTED_ISSUES = 'UPDATE_FIX_SELECTED_ISSUES';
    sscEventService.eventTypes.UPDATE_BUG_FORM_SELECTED_ISSUES = 'UPDATE_BUG_FORM_SELECTED_ISSUES';
    sscEventService.eventTypes.BUG_SUBMITTED = 'BUG_SUBMITTED';
    sscEventService.eventTypes.BUG_TRACKER_CHANGED = 'BUG_TRACKER_CHANGED';
    sscEventService.eventTypes.FILTERSET_CHANGED = 'FILTERSET_CHANGED';
    sscEventService.eventTypes.GET_ISSUES = 'GET_ISSUES';
    sscEventService.eventTypes.TOGGLE_ISSUE_VIEW = 'TOGGLE-ISSUE-VIEW';
    sscEventService.eventTypes.PROJECT_VERSION_CHANGED = 'PROJECT_VERSION_CHANGED';
    sscEventService.eventTypes.PROJECT_VERSION_PRIMARY_TAG_UPDATED = 'PROJECT_VERSION_PRIMARY_TAG_UPDATED';
    sscEventService.eventTypes.SHOW_SIDEBAR = 'SHOW_SIDEBAR';
    sscEventService.eventTypes.CACHE_EXPIRED = 'CACHE_EXPIRED';
    sscEventService.eventTypes.CUSTOM_TAG_ASSIGNED = 'CUSTOM_TAG_ASSIGNED';
    sscEventService.eventTypes.ISSUE_UPDATED = 'ISSUE_UPDATED';
    sscEventService.eventTypes.ISSUE_SUPPRESS_STATE_CHANGED = 'ISSUE_SUPPRESS_STATE_CHANGED';
    sscEventService.eventTypes.ADVANCED_OPTIONS = 'ADVANCED_OPTIONS';
    sscEventService.eventTypes.PROCESSING_RULES = 'PROCESSING_RULES';
    sscEventService.eventTypes.METRICS_REFRESH_REQUEST_SUBMITTED = 'METRICS_REFRESH_REQUEST_SUBMITTED';
    sscEventService.eventTypes.METRICS_EVALUATION_DATE_CHANGED  =  'METRICS_EVALUATION_DATE_CHANGED';
    sscEventService.eventTypes.ADVANCED_OPTIONS_PAYLOAD = 'ADVANCED_OPTIONS_PAYLOAD';
    sscEventService.eventTypes.REFRESH_ISSUES = 'REFRESH_ISSUES';
    sscEventService.eventTypes.BUG_TRACKER_FORM_CHANGED = 'BUG_TRACKER_FORM_CHANGED';
    sscEventService.eventTypes.BUG_TRACKER_CONFIG_CHANGED = 'BUG_TRACKER_CONFIG_CHANGED';
    sscEventService.eventTypes.SESSION_STATE_REFRESHED = 'SESSION_STATE_REFRESHED';
    sscEventService.eventTypes.LOGGING_OUT = 'LOGGING_OUT';
    sscEventService.eventTypes.WIE_CONFIG_UPDATED = 'WIE_CONFIG_UPDATED';
    sscEventService.eventTypes.WIE_SCAN_TEMPLATE_CHANGED = 'WIE_SCAN_TEMPLATE_CHANGED';
    sscEventService.eventTypes.CLOUDSCAN_CONFIG_UPDATED = 'CLOUDSCAN_CONFIG_UPDATED';
    sscEventService.eventTypes.TOGGLE_WIZARD_NAVIGATION = 'TOGGLE_WIZARD_NAVIGATION';

    sscEventService.dispatchHint = function fireHint(isCreate, updateMessage, createMessage) {
        var argsArray = Array.prototype.slice.call(arguments);
        var args = argsArray.slice(3,arguments.length);
        var msg = !isCreate ? updateMessage : createMessage;
        sscEventService.dispatch(sscEventService.eventTypes.DISPLAY_HINT_MESSAGE,
            {message: localeService.locale[msg].format.apply(localeService.locale[msg], args), details: "", time: new Date(), unique: false});
    };

    return sscEventService;

}]);
