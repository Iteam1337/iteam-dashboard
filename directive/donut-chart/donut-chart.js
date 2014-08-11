angular.module('iteam-dashboard').directive('donutChart', function () {
  'use strict';

  function flattenArray(array, element) {
    return array.concat(element);
  }

  return {
    restrict: 'E',
    replace: true,
    scope: {
      users: '=',
      summary: '='
    },
    templateUrl: 'directive/donut-chart/donut-chart.html',
    controller: function ($scope, colors) {
      $scope.color = function (key, dodge) {
        return function (d) {
          var fill = d.data.fill !== undefined;
          if (fill) {
            return 'transparent';
          }
          var user = d.data.user || '';
          var color = colors.getColor(user);

          if (Array.isArray(key)) {
            var step = key.reduce(function (number, _key, index) {
              if (d.data[_key]) {
                number = index + 1;
              }
              return number;
            }, 1);
            return colors.shade(color, (dodge || 5) * step);
          }
          return dodge ? colors.shade(color, dodge) : color;
        };
      };

      $scope.get = function (key) {

        return function (d) {
          if (d.fill) {
            return d.fill;
          }
          if (Array.isArray(key)) {
            return key.reduce(function (value, _key) {
              return d[_key] || value; 
            }, 0);
          }
          return d[key] || 0;
        };
      };

      $scope.outerRing = [];
      $scope.innerRing = [];

      $scope.$watch('users', function (users) {
        if (!users) {
          return;
        }
        $scope.outerRing =  Object.keys(users).map(function (key, index) {
          var person = users[key];
          var userPreview = person.reported + person.calendar;
          var user = {
            user: key,
            planned: person.planned
          };

          var fill = userPreview > person.planned ? {
            user: key,
            fill: userPreview - person.planned
          } : false;

          if (!fill) {
            return [user];
          }

          // we add a fill if userPreview is greater than planned hours
          return [user, fill];
        }).reduce(flattenArray, []);


        $scope.innerRing =  Object.keys(users).map(function (key, index) {
          var person = users[key];
          var userPreview = person.reported + person.calendar;
          if(!userPreview) {
            return [{
              user: key,
              fill: person.planned
            }];
          }

          var reported = {
            user: key,
            reported: person.reported
          };
          var calendar = {
            user: key,
            calendar: person.calendar
          };

          var fill = userPreview < person.planned ? {
            user: key,
            fill: person.planned - userPreview 
          } : false;

          if (!fill) {
            return [reported, calendar];
          }

          // we add a fill if userPreview is greater than planned hours
          return [reported, calendar, fill];
        }).reduce(flattenArray, []);
      });
    }
  };
});
