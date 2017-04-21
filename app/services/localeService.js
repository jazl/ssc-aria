angular.module('sscApp').factory('localeService', ['$locale', 'dateFilter', function ($locale, dateFilter) {
    'use strict';

    return {
        locale: $locale,
        getFormattedDate: function (dateTime, format) {
            return dateFilter(dateTime, format);
        }
    };
}]);
