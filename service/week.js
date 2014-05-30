angular.module('iteam-dashboard').service('week', function($resource) {
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
    getWeek: function (yearWeek) {
      return {
        planned: api.planned({
          yearWeek: yearWeek
        }),
        reported: api.reported({
          yearWeek: yearWeek
        })
      };
    }
  };

  return week;
});