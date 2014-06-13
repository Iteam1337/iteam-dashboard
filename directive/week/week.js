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


      });
    }
  };
});
