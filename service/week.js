angular.module('iteam-dashboard').service('week', function($resource, $q) {
  'use strict';

  var api = $resource('http://api.iteam.se/week/:weekVersion/:yearWeek/:type', {
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

  var weeks = {};

  var week = {
    getYearWeek: function(now){ return moment(now).year() + '' + moment().isoWeek(); },
    getWeekHours: function (yearWeek) {
      if(weeks[yearWeek]) {
        return weeks[yearWeek];
      }

      var week = {
        planned: api.planned({
          yearWeek: yearWeek
        }),
        reported: api.reported({
          yearWeek: yearWeek
        })
      };
      week.$promise = $q.all([week.planned.$promise, week.reported.$promise]);
      
      weeks[yearWeek] = week;
      
      return week;
    }
  };

  return week;
});