angular.module('iteam-dashboard').directive('donutChart', function () {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    scope: {
      users: '='
    },
    templateUrl: 'directive/donut-chart/donut-chart.html',
    controller: function ($scope, colors) {
      function Personal() {
        var person = {
          'user': 'randomUser()',
          'planned': 'randomNumber()',
          'reported': 'randomNumber()'
        };
        var fill = person.planned === person.reported ? false : {};
        if (!fill) {
          return [person];
        }
        if (person.planned < person.reported) {
          fill = {
            'planned_fill': person.reported - person.planned
          };
        } else if (person.reported < person.planned) {
          fill = {
            'reported_fill': person.planned - person.reported
          };
        }
        return [person, fill];
      }

      $scope.color = function (key, dodge) {
        key = key + '_fill';
        return function (d, index) {
          var fill = d.data[key] !== undefined;
          if (fill) {
            return 'transparent';
          }
          var user = d.data.user || '';
          var color = colors.getColor(user);
          return dodge ? colors.shade(color, dodge) : color;
        };
      };

      $scope.get = function (key) {
        var fill = key + '_fill';
        return function (d) {
          if (!!d[fill]) {
            return d[fill];
          }
          return d[key] || 0;
        };
      };

      $scope.data = [];

      $scope.$watch('users', function (users) {
        if (!users) {
          return;
        }
        $scope.data = Object.keys(users).map(function (key, index) {
          var person = users[key];
          var user = {
            'user': key,
            'planned': person.planned,
            'reported': person.reported
          };
          var fill = user.planned === user.reported ? false : {};
          if (!fill) {
            return [user];
          }
          if (user.planned < user.reported) {
            fill = {
              'planned_fill': user.reported - user.planned
            };
          } else if (user.reported < user.planned) {
            fill = {
              'reported_fill': user.planned - user.reported
            };
          }
          return [user, fill];
        }).reduce(function (array, user) {
          array = array.concat(user);
          return array;
        }, []);
      });
    }
  };
});
