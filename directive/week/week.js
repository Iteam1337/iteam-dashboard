angular.module('iteam-dashboard').directive('week', function (project, week, user) {
  'use strict';





  return {
    restrict: 'E',
    replace: true,
    scope: {
      projects: '=',
      user: '='
    },
    templateUrl: 'directive/week/week.html',
    controller: function ($rootScope, $scope, user) {

      $scope.setOffsetAndScale = function (projects) {
        $scope.scale = ($scope.height - 50) / (projects.reduce(function (max, hour) {
          return Math.max(max, hour.planned, hour.reported);
        },0) || 30);

        projects.forEach(function (hourA, i) {
          // calculate heights
          hourA.y1 = $scope.height - Math.round(hourA.planned) * $scope.scale;
          hourA.y2 = $scope.height - Math.round(hourA.reported + hourA.calendar) * $scope.scale;
          hourA.offset = 0;
          hourA.id = i;

          // set offsets
          projects.forEach(function (hourB) {
            if ((hourA.y1 + hourA.offset === hourB.y1 + hourB.offset || hourA.y2 + hourA.offset === hourB.y2 + hourB.offset) && hourA.id !== hourB.id && !hourA.offset) {
              hourA.offset = -$scope.scale / 2;
              hourB.offset = $scope.scale / 2;
            }
          });

          hourA.y1 += hourA.offset;
          hourA.y2 += hourA.offset;
        });
        return projects;
      };

      $scope.show = function () {
        return false;
      };

      $scope.generateSummary = function (projects) {
        var summary = {
          text: 'Inga planerade projekt'
        };

        if (projects.length){
          summary = {
            text: user.getPersonalSummary(projects, $scope.user),
            planned: projects.reduce(function(a,b){
              return a + b.planned;
            }, 0),
            reported: projects.reduce(function(a,b){
              return a + b.reported;
            }, 0),
            biggest: {
              project: projects[0].project,
              planned: projects[0].planned,
              reported: projects[0].reported,
              departments: projects.reduce(function(a,b){
                var department = a[b.department] = a[b.department] || {};
                department.planned = department.planned + b.planned || 0;
                department.reported = department.reported + b.reported || 0;
                return a;
              }, {})
            }
          };
        }
        return summary;
      };

      $rootScope.$on('shotsFired', function (evenet, projects) {
        if(!projects) {
          return;
        }
        $scope.userProjects = $scope.setOffsetAndScale(projects);
        $scope.summary = $scope.generateSummary(projects);

      });
    },
    link: function (scope, element, attrs, fn) {
      scope.height = parseFloat(attrs.height, 10);
      scope.width = parseFloat(attrs.width, 10);
      scope.top = 100;
    }
  };
});
