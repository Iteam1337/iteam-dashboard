angular.module('iteam-dashboard').directive('badge', function () {
  'use strict'

  return {
    restrict: 'E',
    replace: true,
    scope: {
      'user': '='
    },
    templateUrl: 'directive/badge/badge.html',
    controller: function ($scope, colors) {
      $scope.userColor = function () {
        if (!$scope.user) {
          return
        }
        var color = colors.getColor($scope.user)
        return 'background-color:' + color
      }
    }
  }
})
