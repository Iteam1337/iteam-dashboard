angular.module('iteam-dashboard').directive('week', function (project, week) {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    scope: {
      yearweek: '=',
      user: '='
    },
    templateUrl: 'directive/week/week.html',
    link: function (scope, element, attrs, fn) {
      
      scope.height = parseFloat(attrs.height, 10);
      scope.width = parseFloat(attrs.width, 10);
      scope.top = 100;

      var weekHours = week.getWeekHours(scope.yearweek);
      weekHours.$promise.then(function(){

        // filter just this user
        scope.userProjects = project.getWeekHoursSummary(weekHours).filter(function(hour){
          return hour.user === scope.user;
        });

        // calculate scale
        scope.scale = (scope.height - 50) / (scope.userProjects.reduce(function(max, hour){
          return Math.max(max, hour.planned, hour.reported);
        },0) || 30);

        // calculate heights
        scope.userProjects.forEach(function(hour){
          hour.y1 = scope.height - hour.planned * scope.scale;
          hour.y2 = scope.height - hour.reported * scope.scale;
        });

      });
    }
  };
});
