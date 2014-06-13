angular.module('iteam-dashboard').service('week', function($resource, $q) {
  'use strict';

  var api = $resource('http://api-dev.iteam.se/week/:weekVersion/:yearWeek/:type', {
    weekVersion: 9999
  }, {
    planned: {
      params: {
        type: ''
      },
      isArray: true
    },
    reported: {
      params: {
        type: 'reported'
      },
      isArray: true
    }
  });

  var week = {
    getYearWeek: function(now){ return moment(now).year() + '' + moment().isoWeek(); },
    getWeek: function (yearWeek) {
      var week = {
        planned: api.planned({
          yearWeek: yearWeek
        }),
        reported: api.reported({
          yearWeek: yearWeek
        })
      };

      week.$promise = $q.all([week.planned.$promise, week.reported.$promise]);

      return week;
    }
  };

  return week;
});