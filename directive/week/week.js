angular.module('iteam-dashboard').directive('week', function (project, week, user) {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    scope: {
      yearweek: '=',
      user: '='
    },
    templateUrl: 'directive/week/week.html',
    controller: function ($scope, md5) {
      $scope.avatar = 'http://www.gravatar.com/avatar/';
      $scope.avatar += md5.createHash($scope.user + '@iteam.se');
    },
    link: function (scope, element, attrs, fn) {

      scope.height = parseFloat(attrs.height, 10);
      scope.width = parseFloat(attrs.width, 10);
      scope.top = 100;
      week.getProjectsForUser(scope.yearweek.yearWeek, scope.user)
        .then(function (filteredProjects) {
          scope.userProjects = filteredProjects;
          scope.scale = (scope.height - 50) / (scope.userProjects.reduce(function(max, hour){
            return Math.max(max, hour.planned, hour.reported);
          },0) || 30);

          // calculate heights
          scope.userProjects.forEach(function(hour, i ){
            hour.y1 = scope.height - Math.round(hour.planned) * scope.scale;
            hour.y2 = scope.height - Math.round(hour.reported) * scope.scale;
            hour.offset = 0;
            hour.id = i;
          });

          scope.userProjects.forEach(function(hourA){
            scope.userProjects.forEach(function(hourB){
              if ((hourA.y1 + hourA.offset === hourB.y1 + hourB.offset || hourA.y2 + hourA.offset === hourB.y2 + hourB.offset) && hourA.id !== hourB.id && !hourA.offset) {
                hourA.offset = -scope.scale / 2;
                hourB.offset = scope.scale / 2;
              }
            });
          });

          if (scope.userProjects.length){
            scope.summary = {
              text: user.getPersonalSummary(scope.userProjects, scope.user),
              planned: scope.userProjects.reduce(function(a,b){
                return a + b.planned;
              }, 0),
              reported: scope.userProjects.reduce(function(a,b){
                return a + b.reported;
              }, 0),
              biggest: {
                project: scope.userProjects[0].project,
                planned: scope.userProjects[0].planned,
                reported: scope.userProjects[0].reported,
                departments: scope.userProjects.reduce(function(a,b){
                  var department = a[b.department] = a[b.department] || {};
                  department.planned = department.planned + b.planned || 0;
                  department.reported = department.reported + b.reported || 0;
                  return a;
                }, {})
              }
            };
          } else {
            scope.summary = {
              text: 'Inga planerade projekt'
            };
          }
        });
    }
  };
});
