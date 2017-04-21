/*jshint unused: false */
/*global SSC_PROPERTIES*/
angular.module('sscApp').factory('appResources', ['$rootScope', function ($rootScope) {
    'use strict';

    // TODO: don't really need this to work so defining here
    var SSC_PROPERTIES = undefined;

    var protocol = angular.isDefined(SSC_PROPERTIES) ? SSC_PROPERTIES.protocol : window.location.protocol;
    var port = angular.isDefined(SSC_PROPERTIES) ? SSC_PROPERTIES.port : window.location.port;
    var host = angular.isDefined(SSC_PROPERTIES) ? SSC_PROPERTIES.host : window.location.hostname;
    var context = angular.isDefined(SSC_PROPERTIES) ? SSC_PROPERTIES.context : '/ssc';
    var version = angular.isDefined(SSC_PROPERTIES) ? SSC_PROPERTIES.version : 'v1';
    /* The context already has a / when it is passed. The protocol has : */
    var portString = "";
    if(angular.isDefined(port) && port !== '' && port !== null && port.toString() !== '80' && port.toString() !== '443') {
        portString = ":" + port;
    }
    var contextUrlBase = protocol + '//' + host + portString + context;
    var urlBase = contextUrlBase + '/api/' + version;

    var AUTHENTICATION_URLS = {
        REST_PING_URL: urlBase+ '/features/rest-api',
        AUTH_TOKEN_URL: urlBase+ '/auth/obtain_token',
        FORM_AUTH_URL: contextUrlBase + '/j_spring_security_check',
        LOG_OUT: contextUrlBase + "/optout.html",
        CHANGE_PASSWORD: contextUrlBase + "/changePassword.jsp",
        WIE_ONEUSE_TOKEN: urlBase+ '/wieToken'
    };

    var DISPLAY_MODE = {
        EDIT: 'edit',
        VIEW: 'view'
    };

    var APP_WIZARD_MODE = {
        CREATE_APP: 'create-app',
        CREATE_VERSION: 'create-version',
        EDIT_VERSION: 'edit-version',
        CREATE_POOL: 'create-pool',
        EDIT_POOL: 'edit-pool'
    };

    var BASE_URLS = {
        CODE_EDITOR_BASE: '../lib/ace-builds',
        FLEX: contextUrlBase + '/flex/index.jsp',
        FLEX_APP: contextUrlBase + '/flex/index.jsp#projectVersionId={0}',
        USER_PREFERENCES: urlBase + '/userSession/prefs',
        USER_SESSION: urlBase+ '/userSession/info',
        USER_SESSION_STATE: urlBase+ '/userSession/state?hideProgress=true',
        ATTRIBUTE_DEFINITIONS: urlBase+ '/attributeDefinitions',
        ATTRIBUTE_DEFINITION_BY_GUID: urlBase+ '/attributeDefinitions?q=guid:{0}',
        ISSUE_TEMPLATE: urlBase+ '/issueTemplates',
        ISSUE_TEMPLATE_ID_CUSTOM_TAGS: urlBase+ '/issueTemplates/{0}/customTags',
        ISSUE_DETAILS: urlBase + '/issueDetails/{0}',
        ISSUE_DETAILS_SEARCH: urlBase + '/issueDetails?instanceId={0}&projectName={1}&projectVersionName={2}&engineType={3}',
        ISSUE_COMMENTS: urlBase + '/comments',
        ISSUE_ID_COMMENTS: urlBase + '/issues/{0}/comments',
        ISSUE_ID_HISTORY: urlBase + '/issues/{0}/auditHistory',
        ISSUE_AGING: urlBase + '/issueaging',
        AUTHENTITIES: urlBase + '/authEntities',
        GET_USERS: urlBase+ '/authEntities?q=isLdap:{0}',
        GET_USERS_BY_TYPE: urlBase+ '/authEntities?q=isLdap:{0}&embed=roles(name)&start={1}&limit={2}',
        GET_PERSONAS: urlBase+ '/personas',
        GET_PROJECTS: urlBase+ '/projects',
        PROJECT_VERSION: urlBase+ '/projectVersions',
        PROJECT_VERSION_ID: urlBase+ '/projectVersions/{0}?hideProgress=true',
        PROJECT_VERSION_ID_SEARCH:  urlBase+ '/projectVersions/?hideProgress=true&q=id:{0}',
        PROJECT_VERSION_ID_ARTIFACTS: urlBase+ '/projectVersions/{0}/artifacts?hideProgress=true',
        PROJECT_VERSION_ID_ATTRIBUTES: urlBase+ '/projectVersions/{0}/attributes',
        PROJECT_VERSION_ID_SCANS: urlBase+ '/projectVersions/{0}/scans',
        PROJECT_VERSION_ID_ISSUES: urlBase+ '/projectVersions/{0}/issues',
        PROJECT_VERSION_ID_ISSUES_BY_IDS: urlBase+ '/projectVersions/{0}/issues?ids={1},active:*',
        PROJECT_VERSION_ID_ISSUE_BY_ID: urlBase+ '/projectVersions/{0}/issues/{1}',
        PROJECT_VERSION_ID_ISSUESUMMARIES: urlBase+ '/projectVersions/{0}/issueSummaries?seriestype=ISSUE_FOLDER&groupaxistype={1}&audited={2}',
        PROJECT_VERSION_ID_ISSUESUMMARIES_DETAILS: urlBase+ '/projectVersions/{0}/issueSummaries?seriestype=ISSUE_FOLDER&groupaxistype={1}&audited={2}&filter={3}',
        PROJECT_VERSION_ID_ISSUESELECTOR: urlBase+ '/projectVersions/{0}/issueSelectorSet?type=FILTER,GROUP',
        PROJECT_VERSION_ID_FILTERSETS: urlBase+ '/projectVersions/{0}/filterSets',
        PROJECT_VERSION_ID_ISSUEGROUPS: urlBase+ '/projectVersions/{0}/issueGroups?groupingtype={1}&filterset={2}',
        PROJECT_VERSION_ID_BUGS: urlBase+ '/projectVersions/{0}/bugs',
        PROJECT_VERSION_ID_BUG_TRACKER: urlBase+ '/projectVersions/{0}/bugtracker',
        PROJECT_VERSION_ID_SOURCEFILES: urlBase + '/projectVersions/{0}/sourceFiles?q=path:"{1}"',
        PROJECT_VERSION_ISSUE_SEARCH_OPTIONS: urlBase+ '/projectVersions/{0}/issueSearchOptions',
        PROJECT_VERSION_ISSUE_STATISTICS: urlBase+ '/projectVersions/{0}/issueStatistics',
        PROJECT_VERSION_RESULT_PROCESSING_RULES: urlBase+ '/projectVersions/{0}/resultProcessingRules',
        PROJECT_ID_ATTRIBUTES: urlBase+ '/projects/{0}/attributes',
        PROJECT_VERSION_ID_AUTHENTITIES: urlBase+ '/projectVersions/{0}/authEntities',
        PROJECT_VERSION_ID_ISSUEASSIGNMENT: urlBase+ '/projectVersions/{0}/issueAssignment',
        PROJECT_VERSION_ID_NONREST_ACTION: urlBase+ '/projectVersions/{0}/action',
        PROJECT_ID_AUTHENTITIES: urlBase+ '/projects/{0}/authEntities',
        PROJECT_VERSION_ID_RESPONSIBILITIES: urlBase+ '/projectVersions/{0}/responsibilities',
        PROJECT_ID_RESPONSIBILITIES: urlBase+ '/projects/{0}/responsibilities',
        PROJECT_ID_VERSIONS: urlBase + '/projects/{0}/versions',
        AUTHENTITIES_ID_PROJECT_VERSION: urlBase+ '/authEntities/{0}/projectVersions',
        ARTIFACT: urlBase+ '/artifacts/{0}' ,
        ARTIFACT_NONREST_ACTION: urlBase+ '/artifacts/{0}/action',
        ARTIFACT_SCAN_ERRORS: urlBase+ '/artifacts/{0}/scanerrors',
        BULK: urlBase+ '/bulk',
        BULK_DASHBOARD_PREV_RESOURCE: 'response://this/prev/data[0..n-1]/projectVersionHref',
        BULK_PREV_RESOURCE: 'response://this/prev/data[0..n-1]/_href',
        BULK_PROJECT_VARS: 'response://this/item[1][0..n-1]/links/variableHistories/href?' +
            'q=id:(CFPOAudited+HFPOAudited+MFPOAudited+LFPOAudited+CFPOUnaudited+HFPOUnaudited+MFPOUnaudited+LFPOUnaudited+ISSUES)',
        BULK_PROJECT_ATTR: 'response://this/item[1][0..n-1]/links/attributes/href',
        BULK_PROJECT_PERF: 'response://this/item[1][0..n-1]/links/performanceIndicatorHistories/href',
        BULK_PROJECT_ARTIFACTS: 'response://this/item[1][0..n-1]/links/artifacts/href?fields=lastScanDate',
        DASHBOARD_TRENDS: urlBase+ '/dashboardVersions',
        DASHBOARD_VERSIONS: urlBase+ '/dashboardVersions',
        EVENT_LOGS: urlBase+ '/events',
        JOBS_VIEW: urlBase+ '/jobs',
        JOB_NONREST_ACTION: urlBase+ '/jobs/{0}/action',
        JOB_VIEW: urlBase+ '/jobs/{0}',
        JOB_GET_PRIORITY_WARNING: urlBase+ '/jobs/{0}/warnings?priority={1}',
        ACTIVITY_FEED: urlBase+ '/activityFeedEvents?hideProgress={0}&limit=8',
        ALERT_HISTORY: urlBase+ '/alerts?hideProgress={0}', /* a read-only endpoint for alerthistory, alert admin UI is supported by alertDefinitions below */
        ALERT_HISTORY_NONREST_ACTION: urlBase+ '/alerts/action',
        UPLOADS: urlBase+ '/uploads?limit=3', /*TBD*/
        SIGNOFFS: urlBase+ '/signoffs?limit=3', /*TBD*/
        SSC_CONFIGURATION: urlBase+ '/configuration',
        VALIDATE_REPORTS_CONNECTION: urlBase+ '/configuration/validateReportConnection',
        APPLICATION_STATE: urlBase+ '/applicationState?hideProgress=true',
        REPORT_LIBRARIES: urlBase+ '/reportLibraries',
        LOCAL_USERS: urlBase+ '/localUsers',
        LDAP_OBJECTS: urlBase+ '/ldapObjects',
        LDAP_OBJECTS_ACTION: urlBase+ '/ldapObjects/action',
        LDAP_CONFIGS: urlBase+ '/ldapServers',
        RULEPACKS: urlBase+ '/coreRulepacks',
        UPDATE_RULEPACKS: urlBase+ '/updateRulepacks',
        RULEPACK_VERSIONS: urlBase+ '/rulepackVersions',
        VARIABLES: urlBase+ '/variables',
        VARIABLE_FOLDERS: urlBase+ '/folders',
        CUSTOM_TAGS: urlBase+ '/customTags',
        CUSTOM_TAGS_VERSION: urlBase+ '/projectVersions/{0}/customTags',
        VALIDATE_SEARCH_STRING: urlBase+ '/validateSearchString',
        VALIDATE_EQUATION: urlBase+ '/validateEquation',
        ADMIN_PERFORMANCE_INDICATORS: urlBase+ '/performanceIndicators',
        SAVED_REPORTS: urlBase+'/reports?embed=reportDefinition(id,name,description)',
        SAVED_REPORT: urlBase+'/reports/{0}',
        GENERATE_REPORT: urlBase+'/reports',
        ROLES: urlBase+'/roles',
        REPORT_DEFINITIONS: urlBase+'/reportDefinitions',
        ALERT_DEFINITIONS: urlBase+'/alertDefinitions',
        ALERT_DEFINITION_PROJECT_VERSIONS: urlBase+ '/alertDefinitions/{0}/projectVersions',
        ALERTABLE_EVENT_TYPES: urlBase+'/alertableEventTypes',
        SYSTEM_CONFIGURATION: urlBase+'/systemConfiguration',
        PERMISSIONS_ID: urlBase+'/roles/{0}/permissions',
        PERMISSIONS: urlBase+'/permissions',
        BUG_TRACKER: urlBase+'/projectVersions/{0}/bugfilingrequirements',
        BUG_TRACKERS: urlBase+'/bugtrackers',
        BUG_TRACKERS_CONFIG: urlBase+'/bugtrackers/{0}',
        BUG: urlBase+'/projectVersions/{0}/bugs',
        BUG_ACTION: urlBase+'/projectVersions/{0}/issues/action',
        ISSUE_ACTION: urlBase+'/projectVersions/{0}/issues/action',         // TODO: URL same as bug action, refactor
        ISSUES: urlBase + '/issues',
        CONFIGURATION_INDEX_STATUS: urlBase + '/configuration/searchIndex?hideProgress=true',
        CLOUDSCAN_JOBS : urlBase + '/cloudjobs',
        CLOUDSCAN_WORKERS : urlBase + '/cloudworkers',
        CLOUDSCAN_WORKER_JOBS : urlBase + '/cloudworkers/{0}/cloudjobs',
        CLOUDSCAN_CANCEL_JOB : urlBase + '/cloudjobs/{0}/action',
        CLOUDSCAN_CONTROLLER_METRICS : urlBase + '/cloudsystem/metrics',
        CLOUDSCAN_CONTROLLER_SETTINGS : urlBase + '/cloudsystem/settings',
        CLOUDSCAN_CONTROLLER_POLL_STATUS : urlBase + '/cloudsystem/pollstatus',
        CLOUDSCAN_POOLS : urlBase + '/cloudpools',
        CLOUDSCAN_POOL : urlBase + '/cloudpools/{0}',
        CLOUDSCAN_POOL_JOBS : urlBase + '/cloudpools/{0}/jobs',
        CLOUDSCAN_POOL_WORKERS : urlBase + '/cloudpools/{0}/workers',
        CLOUDSCAN_POOL_MAP_APPLICATION : urlBase + '/cloudpools/mapProjectVersion',
        CLOUDSCAN_POOL_APPLICATIONS : urlBase + '/cloudpools/{0}/versions'
    };

    var GUIDS = {
        BUSINESS_RISK: 'BusinessRisk', //id = 1
        DEV_PHASE: 'DevPhase',         //id = 5
        COMPLIANCE: 'Compliance',
        INFO_CLASSIFICATION: 'InfoClassification',
        BUSINESS_UNIT: 'BusinessUnit',     //id = 25
        INDUSTRY: 'Industry',              //id = 26
        REGION: 'Region',                  //id = 27
        DEFAULT_ISSUE_TEMPLATE: 'Prioritized-HighRisk-Project-Template'
    };

    var QUERY_PARAMS = {
        OPTIMIZE_OFF: 'optimize=false',
        ORDERBY_TOTAL_AUDITED_ISSUES: 'orderby=CFPOAudited-,HFPOAudited-,MFPOAudited-,LFPOAudited-',
        ORDERBY_TOTAL_UNAUDITED_ISSUES: 'orderby=CFPOUnaudited-,HFPOUnaudited-,MFPOUnaudited-,LFPOUnaudited-',
        ORDERBY_TOTAL_ISSUES: 'orderby=CFPO-,HFPO-,MFPO-,LFPO-',
        DASHBOARD_VARIABLES: 'variables=CFPOAudited,HFPOAudited,MFPOAudited,LFPOAudited,CFPOUnaudited,HFPOUnaudited,MFPOUnaudited,LFPOUnaudited,ISSUES',
        DASHBOARD_ATTRIBUTES: 'attributes='+GUIDS.DEV_PHASE,
        PROJECT_VERSION_SEARCH: 'fields=id,name,project,active,committed,owner,description,creationDate,currentState&limit={0}&start={1}&q={2}',
        PROJECT_VERSION_SEARCH_ALL: 'fields=id,name,project,active,committed,owner,description,creationDate,currentState&limit={0}&start={1}',
        PROJECT_VERSION_UNIQUE_SEARCH: 'fields=id,name,project&limit=1&start=0&q={0}',
        PROJECT_SEARCH: 'fields=id,name&limit=1&start=0&q={0}',
        FULL_TEXT: 'fulltextsearch=true&q={0}',
        Q_VERSION_AND_PROJECT_NAME: 'name:"{0}"+and+project.name:"{1}"',
        Q_VERSION_OR_PROJECT_NAME: 'name:"{0}"+or+project.name:"{1}"'
    };

    var FILE_URLS = {

        // Authentication attribute that must be added to file upload and download requests.
        // Value of this parameter is GUID string generated by server before each upload/download request.
        // how come some of the URLs such as reportLibraryUpload don't have the 'mat' parameter?
        MAT_PARAMETER_NAME: "mat",

        CREATE_TOKEN: urlBase+ '/fileTokens', //mat=284db0ac-0500-4449-8bc4-3b26931cbe1f

        /*===== UPLOAD URLS =====*/
        // URL for FPR files uploading
        RESULT_FILE_UPLOAD: contextUrlBase + '/upload/resultFileUpload.html?mat={0}',
        // URL for report library files uploading
        REPORT_LIBRARY_UPLOAD: contextUrlBase + '/upload/reportLibraryUpload.html',
        // URL for rulepack files uploading
        RULEPACK_UPLOAD: contextUrlBase + '/upload/rulepackUpload.html?mat={0}',
        // URL for report definition template uploading
        REPORT_DEFINITION_TEMLATE_UPLOAD: contextUrlBase + '/upload/reportDefinitionTemplateUpload.html',
        // URL for issue template files uploading
        ISSUE_TEMPLATE_UPLOAD: contextUrlBase + '/upload/projectTemplateUpload.html',

        /*===== DOWNLOAD URLS =====*/
        // URL for report library files downloading
        REPORT_LIBRARY_DOWNLOAD: contextUrlBase + '/download/reportLibraryDownload.html?mat={0}',
        RULEPACK_DOWNLOAD: contextUrlBase + '/download/rulepackDownload.html?mat={0}',
        SAVED_REPORT_DOWNLOAD: contextUrlBase + '/transfer/reportDownload.html?mat={0}',
        REPORT_TEMPLATE_DOWNLOAD: contextUrlBase + '/download/reportDefinitionTemplateDownload.html?mat={0}',
        ISSUE_TEMPLATE_DOWNLOAD: contextUrlBase + '/download/projectTemplateDownload.html?mat={0}',
        EXPORTED_ROLES_DOWNLOAD: contextUrlBase + '/download/role_csv.html?mat={0}',
        FINISH_UPLOADS: urlBase+ '/fileTokens',
        RESULT_FILE_DOWNLOAD: contextUrlBase + '/download/artifactDownload.html?mat={0}',
        CURRENT_STATE_RESULT_FILE_DOWNLOAD:  contextUrlBase + '/download/currentStateFprDownload.html?mat={0}',
        EVENTLOG_DOWNLOAD: contextUrlBase + '/download/eventlog_csv.html?mat={0}',
        LOCAL_USERS_DOWNLOAD: contextUrlBase + '/download/user_csv.html?mat={0}',
        LDAP_OBJECTS_DOWNLOAD: contextUrlBase + '/download/ldap_csv.html?mat={0}',
        CLOUD_SCAN_LOG_DOWNLOAD: contextUrlBase + '/download/cloudScanLogDownload.html?mat={0}',
        CLOUD_SCAN_FPR_DOWNLOAD: contextUrlBase + '/download/cloudScanFprDownload.html?mat={0}'
    };

    var WIE = {
        TOKENS: '{0}/api/v1/tokens',
        BLACKOUTS: '{0}/api/v1/blackouts?start={1}&limit={2}',
        PROJECT_VERSION: '{0}/api/v1/projectVersions?start={1}&limit={2}',
        PROJECT_VERSION_ID: '{0}/api/v1/projectVersions/{1}',
        PROJECT_VERSION_BY_GROUP: '{0}/api/v1/securityGroups/{1}/projectVersions?start={2}&limit={3}',
        SCAN_TEMPLATE: '{0}/api/v1/scanTemplates?start={1}&limit={2}',
        SCAN_TEMPLATE_ID: '{0}/api/v1/scanTemplates/{1}',
        SCAN_TEMPLATE_SETTINGS: '{0}/api/v1/scanTemplates/{1}/scanSettings',
        SCAN_TEMPLATE_BY_GROUP: '{0}/api/v1/securityGroups/{1}/scanTemplates?start={2}&limit={3}',
        SCAN_TEMPLATE_BY_PROJECT_VERSION: '{0}/api/v1/projectVersions/{1}/scanTemplates?start={2}&limit={3}',
        SCAN_TEMPLATE_SAVE: '{0}/api/v1/scanTemplates/wizard',
        SCAN_SCHEDULES: '{0}/api/v1/scanSchedules',
        SCAN_TEMP_FILE: '{0}/api/v1/tempFile',
        SCAN_TEMP_FILE_DATA: '{0}/api/v1/tempFile/{1}/fileData',
        SCANS: '{0}/api/v1/scans',
        SCANS_WIZARD: '{0}/api/v1/scans/wizard',
        SECURITY_GROUP: '{0}/api/v1/securityGroups?start={1}&limit={2}',
        SECURITY_GROUP_ID: '{0}/api/v1/securityGroups/{1}',
        SECURITY_GROUP_SENSORS: '{0}/api/v1/securityGroups/{1}/sensors',
        SENSORS: '{0}/api/v1/sensors?start={1}&limit={2}',
        SYSTEM_CONFIGURATION_ALL: '{0}/api/v1/systemConfiguration',
        ORGANIZATION: '{0}/api/v1/organizations?start={1}&limit={2}',
        ORGANIZATION_ID: '{0}/api/v1/organizations/{1}',
        POLICY: '{0}/api/v1/policies?start={1}&limit={2}',
        POLICY_ID: '{0}/api/v1/policies/{1}',
        POLICY_BY_GROUP: '{0}/api/v1/securityGroups/{1}/policies?start={1}&limit={2}',
        MACROS: '{0}/api/v1/macros',
        MACROS_BY_PROJECT_VERSION: '{0}/api/v1/projectVersions/{1}/macros'

        /*,
         :"{0}/REST/api/v1/projectVersions/{1}/scanTemplates?start={1}&limit={2}",
         :"{0}/REST/api/v1/scanTemplates?sourceId={sourceId}",
         :"{0}/REST/api/v1/scanTemplates
         :"{0}/REST/api/v1/scanTemplates/{1}",
         :"{0}/REST/api/v1/scanTemplates?ids={ids}",

         :"{0}/REST/api/v1/organizations/{1}/securityGroups?start={1}&limit={2}",

         PROJECT:"{0}/REST/api/v1/projects?start={1}&limit={2}",
         PROJECT_ID:"{0}/REST/api/v1/projects/{1}",
         :"{0}/REST/api/v1/projects/{name}",
         :"{0}/REST/api/v1/projects/{1}/projectVersions?start={1}&limit={2}",
         :"{0}/REST/api/v1/blackouts?start={1}&limit={2}",
         :"{0}/REST/api/v1/blackouts/{1}",
         :"{0}/REST/api/v1/securityGroups/{1}/blackouts?start={1}&limit={2}",
         :"{0}/REST/api/v1/blackouts
         :"{0}/REST/api/v1/blackouts/{1}",
         :"{0}/REST/api/v1/blackouts?ids={ids}",
         :"{0}/REST/api/v1/scanSchedules?start={1}&limit={2}",
         :"{0}/REST/api/v1/scanSchedules/{1}",
         :"{0}/REST/api/v1/scanSchedules/{1}/scanSettings
         :"{0}/REST/api/v1/securityGroups/{1}/scanSchedules?start={1}&limit={2}",
         :"{0}/REST/api/v1/projectVersions/{1}/scanSchedules?start={1}&limit={2}",

         :"{0}/REST/api/v1/scanSchedules/{1}",
         :"{0}/REST/api/v1/scanSchedules?ids={ids}"*/
        /*:"{0}/REST/api/v1/sensors?start={1}&limit={2}",
         :"{0}/REST/api/v1/sensors/{1}",
         */
};
/*jshint unused: false */
/*global SSC_PROPERTIES*/
    var ENUMS = {
        ATTRIBUTE_TYPES: {
            TEXT: "TEXT",
            SINGLE: "SINGLE",
            MULTIPLE: "MULTIPLE",
            LONG_TEXT: "LONG_TEXT",
            SENSITIVE_TEXT: "SENSITIVE_TEXT",
            BOOLEAN: "BOOLEAN",
            INTEGER: "INTEGER",
            DATE: "DATE",
            FILE: "FILE"
        },
        ATTRIBUTE_CATEGORIES: {
            ORGANIZATION: 'ORGANIZATION',
            TECHNICAL: 'TECHNICAL',
            BUSINESS: 'BUSINESS',
            DYNAMIC: 'DYNAMIC_SCAN_REQUEST'
        },
        BUSINESS_RISK: {
            HIGH: 'High',
            MEDIUM: 'Medium',
            LOW: 'Low'
        },
        USER_TYPE: {
            LOCAL: 'LOCAL',
            LDAP: 'LDAP'
        },
        ISSUE_SELECTOR_TYPE: {
            FOLDER:'FOLDER',
            CUSTOM_TAG:'CUSTOMTAG',
            HYBRID_TAG:'HYBRIDTAG',
            EXTERNAL_LIST:'EXTERNALLIST'
        },
        INDICATOR_RETURN_TYPE: {
            INTEGER: 'Integer',
            PERCENT: 'Percent'
        },
        REPORT_STATUS: {
            PROCESS_COMPLETE: 'PROCESS_COMPLETE'
        },
        ATTRIBUTE_SCOPE: {
            PROJECT_VERSION: 'PROJECT_VERSION',
            RUNTIME_APP: 'RUNTIME_APP',
            ALL: 'ALL'
        },
        ALERT_RECIPIENT_TYPE: {
            ME_ONLY: "ME_ONLY",
            PROCESS_ENTITY_STAKEHOLDERS: "PROCESS_ENTITY_STAKEHOLDERS",
            ALL_USERS: "ALL_USERS"
        },
        ALERTABLE_ENTITY_TYPE: {
            RT_INSTANCE: "RT_INSTANCE",
            REQ_INSTANCE: "REQ_INSTANCE",
            ACTIVITY_INSTANCE: "ACTIVITY_INSTANCE",
            MEASUREMENT_AGENT: "MEASUREMENT_AGENT",
            VARIABLE: "VARIABLE",
            RUNTIME_ALERT: "RUNTIME_ALERT",
            EVENT: "EVENT"
        },
        ALERTABLE_ATTRIBUTE_TYPE: {
            SIGN_OFF_STATE: "SIGN_OFF_STATE",
            VALUE_GT: "VALUE_GT",
            VALUE_LT: "VALUE_LT",
            VALUE_EQ: "VALUE_EQ",
            VALUE_GTE: "VALUE_GTE",
            VALUE_LTE: "VALUE_LTE",
            EVENT_TYPE: "EVENT_TYPE"
        },
        SYSTEM_CONFIGURATION_TYPE: {
            IS_EMAIL_ENABLED: 'IS_EMAIL_ENABLED',
            IS_LDAP_ENABLED: 'IS_LDAP_ENABLED',
            IS_LDAP_CACHE_ENABLED: 'IS_LDAP_CACHE_ENABLED',
            IS_ADMINISTRATOR_EMAIL_ADDRESS_SET: 'IS_ADMINISTRATOR_EMAIL_ADDRESS_SET',
            META_VALUE_ALLOWED_FILE_SIZE: 'META_VALUE_ALLOWED_FILE_SIZE',
            META_VALUE_ALLOWED_FILE_TYPES: 'META_VALUE_ALLOWED_FILE_TYPES',
            AUTHENTICATION_PASSWORD_MIN_LENGTH: 'AUTHENTICATION_PASSWORD_MIN_LENGTH',
            UPLOAD_BYTE_LIMIT_ANALYSIS_RESULT: 'UPLOAD_BYTE_LIMIT_ANALYSIS_RESULT'
        },
        SYSTEM_USAGE_TYPE: {
            HP_DEFINED_DELETABLE : 'HP_DEFINED_DELETABLE',
            HP_DEFINED_NON_DELETABLE : 'HP_DEFINED_NON_DELETABLE',
            USER_DEFINED_DELETABLE : 'USER_DEFINED_DELETABLE',
            USER_DEFINED_NON_DELETABLE : 'USER_DEFINED_NON_DELETABLE'
        }
    };

    var DATE_RANGE = {
        WEEK    : "WEEK",
        MONTH   : "MONTH",
        TWO_MONTHS : "TWO_MONTHS",
        SIX_MONTHS : "SIX_MONTHS",
        YEAR : "YEAR",
        CUSTOM : "CUSTOM"
    };


    var DEVPHASE_GUIDS = {
        NEW_PHASE: 'New',
        ACTIVE_PHASE: 'Active',
        MAINTENANCE_PHASE: 'Maintenance',
        RETIRED_PHASE: 'Retired'
    };

    var PERSONA_GUIDS = {
        PROJECT_MANAGER: "projectmanager",
        SECURITY_MANAGER: "securitychampion",
        DEVELOPMENT_MANAGER: "developmentmanager"
    };

    var VIEW_CONSTANTS = {
        FLEX_WINDOW: 'ssc_flex',
        NUMBER_FIELD_MAX_CHARS: 11,
        CLIENT_VERSION: "0.0.0.0000",
        FILE_UPLOAD_TYPES: /(\.|\/)(fpr|zip|jpe?g|png|xml|bin|rpr|log|log\.gz)$/i,
        MAX_FILE_SIZE: 20000000,
        MAX_NUMBER_OF_FILES: 5,
        MAX_NAME_SMALL: 23,
        MAX_NAME_VERY_SHORT: 25,
        MAX_NAME_SHORT: 50,
        MAX_NAME_MEDIUM: 80,
        MAX_ISSUE_FILEPATH: 80,
        MAX_DESCRIPTION_MEDIUM: 256,
        MAX_DIALOG_MSG_LINE: 100,
        MAX_DIALOG_SCAN_ERROR_LINE: 170,
        REVIEWED :'reviewed',
        UNREVIEWED : 'unreviewed',
        VARIABLES: 'variables',
        PERFORMANCE_INDICATORS: 'performanceIndicators',
        REFRESH_INTERVAL: 10000,
        SSC_CONTEXT : context
    };

    var TABLE_PAGE_COUNT_OPTIONS = {
        "COUNTS_10_20_50": [10, 20, 50],
        "COUNTS_20_50_100": [20, 50, 100]
    };

    var APPLICATION_HOTKEYS =
    {
        "CANCEL_DIALOG": { category: "global", key: "esc", description: "Cancel/Close dialogs" },
        //"SUBMIT_DIALOG": { category: "global", key: "ctrl+enter", description: "Submit/generate/okay/success on any dialog" },
        "OPEN_ALERT": { category: "global", key: "ctrl+alt+a", description: "Open alert dialog" },
        "LOGOUT": { category: "global", key: "ctrl+alt+q", description: "Log out" },
        "DASHBOARD": { category: "global", key: "ctrl+alt+h", description: "Go to global dashboard" },
        "SEARCH": { category: "global", key: "ctrl+alt+f", description: "Set focus on search" },
        "FILTER": { category: "global", key: "ctrl+alt+l", description: "Set focus on filter box" },
        "GROUP_BY": { category: "global", key: "ctrl+alt+g", description: "Set focus on group by box" },
        "RIGHT_PANEL": { category: "global", key: "ctrl+alt+]", description: "Hide/Show right panel" },
        "NEW_APPLICATION": { category: "dashboard", key: "ctrl+alt+n", description: "Open new application wizard" },
        "AGGREGATE": { category: "dashboard", key: "ctrl+alt+e", description: "Set focus on aggregate box" },
        "NEW_VERSION": { category: "version", key: "ctrl+alt+n", description: "Open new version" },
        "APPLICATION_PROFILE": { category: "version", key: "ctrl+alt+p", description: "Application profile" },
        "VERSION_SELECTOR": { category: "version", key: "ctrl+alt+v", description: "Focus on version selector" },
        "OVERVIEW": { category: "version", key: "ctrl+alt+o", description: "Overview page" },
        "SCAN": { category: "version", key: "ctrl+alt+s", description: "Scan page" },
        "FIX": { category: "version", key: "ctrl+alt+r", description: "Audit page" },
        "UPLOAD_SCAN": { category: "version", key: "ctrl+alt+u", description: "Go to scan page and open upload dialog" },
        "NEXT_ISSUE": { category: "version", key: "ctrl+alt+.", displayKey: "ctrl+alt+>", description: "Go to the next issue" },
        "PREVIOUS_ISSUE": { category: "version", key: "ctrl+alt+,", displayKey: "ctrl+alt+<", description: "Go to the previous issue" }
    };

    var VALIDATION_PATTERNS =
    {
        "POSITIVE_INTEGER":'^[1-9][0-9]*$',
        "INTEGER":'^[0-9]*$'
    };
    // Maps to WIE System Configuration SCAN_TYPE enum
    var WIE_SCAN_WIZARD_TYPE = {
        "WEBSITE": "0",
        "WEBSERVICE": "1",
        "GUIDED": "2"       // TODO: is this needed?
    };

    // Maps to WIE System Configuration SCAN_MODE enum
    // TODO: in the future this will come from WIE /systemConfiguration endpoint
    var WIE_SCAN_MODE = {
        "CRAWL": "1",
        "CRAWL_AUDIT": "2",
        "AUDIT": "4"
    };

    // Maps to WIE System Configuration SCAN_START_METHODS enum
    var WIE_SCAN_START_METHOD = {
        "STANDARD": "0",
        "LIST": "1",
        "WORKFLOW": "2"
    };

    // PAC and EXPLICIT map to WIE System Configuration NETWORK_PROXY_MODE enum
    var WIE_PROXY_CONFIG_TYPES = {
        PAC: "3",               // Using PAC file
        EXPLICIT: "4"           // Use explicit settings
    };

    var WIE_BLACKOUT_TYPE = {
        ALLOW_SCANS: "allow",
        DENY_SCANS: "deny"
    };

    var WIE_RECURRENCE_END_TYPE = {
        NEVER: "never",     // never ends
        DATE: "date",       // ends on specified date
        COUNT: "count"      // ends after n occurrences
    };

    // Duplicates of WIE system config SETTINGS_FILE_TYPE!
    var WIE_SETTINGS_FILE_TYPE = {
        WORKFLOW_DRIVEN_MACRO: "0", // "Workflow-driven Macro"
        LOGIN_MACRO: "1",           // "Login Macro"
        LIST_DRIVEN: "2",           // "List Driven"
        WEB_FORM: "3",              // "Web Form Values"
        WEB_SERVICE_DESIGN: "4",    // "Web Service Design"
        SCAN_SETTINGS: "5"          // "WebInspect Scan Settings
    };

    return {
        APP_WIZARD_MODE:APP_WIZARD_MODE,
        AUTHENTICATION_URLS: AUTHENTICATION_URLS,
        BASE_URLS: BASE_URLS,
        DATE_RANGE: DATE_RANGE,
        DEVPHASE_GUIDS: DEVPHASE_GUIDS,
        DISPLAY_MODE: DISPLAY_MODE,
        ENUMS: ENUMS,
        FILE_URLS: FILE_URLS,
        GUIDS: GUIDS,
        HOTKEYS: APPLICATION_HOTKEYS,
        PERSONA_GUIDS: PERSONA_GUIDS,
        QUERY_PARAMS: QUERY_PARAMS,
        TABLE_PAGE_COUNT_OPTIONS: TABLE_PAGE_COUNT_OPTIONS,
        VALIDATION_PATTERNS:VALIDATION_PATTERNS,
        VIEW_CONSTANTS: VIEW_CONSTANTS,
        WIE:WIE,
        WIE_SCAN_WIZARD_TYPE: WIE_SCAN_WIZARD_TYPE,
        WIE_SCAN_START_METHOD: WIE_SCAN_START_METHOD,
        WIE_SCAN_MODE: WIE_SCAN_MODE,
        WIE_BLACKOUT_TYPE: WIE_BLACKOUT_TYPE,
        WIE_PROXY_CONFIG_TYPES: WIE_PROXY_CONFIG_TYPES,
        WIE_RECURRENCE_END_TYPE: WIE_RECURRENCE_END_TYPE,
        WIE_SETTINGS_FILE_TYPE: WIE_SETTINGS_FILE_TYPE
    };
}]);
