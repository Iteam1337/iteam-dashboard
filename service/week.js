angular.module('iteam-dashboard').service('week', function($resource, $q, $rootScope, project, user) {
  'use strict';
  var api = $resource('http://api.iteam.se/week/:weekVersion/:yearWeek/:type', {
    weekVersion: -1
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
    },
    calendar: {
      params: {
        type: 'calendar'
      },
      isArray: true
    }
  });

  var weeks = {};

  function getWeekHours(yearWeek) {
    if (weeks[yearWeek]) {
      return weeks[yearWeek];
    }

    var weekVersion = angular.copy(yearWeek);
    if (yearWeek > $rootScope.weeks[5].yearWeek) {
      weekVersion = angular.copy($rootScope.weeks[5].yearWeek);
    }

    var week = {
      planned: api.planned({
        weekVersion: weekVersion,
        yearWeek: yearWeek
      }),
      reported: api.reported({
        yearWeek: yearWeek
      }),
      calendar: api.calendar({
        yearWeek: yearWeek
      })
    };
    week.$promise = $q.all([week.planned.$promise, week.reported.$promise]);
    
    weeks[yearWeek] = week;
    
    return week;
  }

  var week = {
    getYearWeek: function(now){ return moment(now).year() + '' + moment().isoWeek(); },
    
    getProjects: function (yearWeek) {
      var weekHours = getWeekHours(yearWeek);
      var projects = {};
      weekHours.$promise.then(function () {
        angular.extend(projects, project.getProjects(weekHours));
      });

      weekHours.calendar.$promise.then(function () {
        angular.extend(projects, project.getProjects(weekHours));
      });
      return projects;
    },

    getUsers: function (yearWeek) {
      var weekHours = getWeekHours(yearWeek);
      var users = {};
      weekHours.$promise.then(function () {
        angular.extend(users, user.getUsers(weekHours));
      });
      return users;
    },

    getProjectsForUser: function (yearWeek, user) {
      var deferred = $q.defer();
      var weekHours = getWeekHours(yearWeek);
      weekHours.$promise.then(function () {
        var filtered = project.getWeekHoursSummary(weekHours).filter(function (hour) {
          return hour.user === user;
        }).sort(function (a, b) {
          return a.planned - b.planned;
        });
        deferred.resolve(filtered);
      });
      return deferred.promise;
    },

    getUsersForProject: function (yearWeek, projectId) {
      var deferred = $q.defer();
      var weekHours = getWeekHours(yearWeek);
      weekHours.$promise.then(function () {
        var projects = project.getProjects(weekHours);
        deferred.resolve(projects[projectId] && projects[projectId].users || []);
      });
      return deferred.promise;
    }
  };

  return week;
});