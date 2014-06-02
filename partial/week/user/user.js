angular.module('iteam-dashboard').controller('WeekUserCtrl', function ($scope, user) {
  'use strict';
  $scope.week.$promise.then(function(){
    $scope.users = user.getUsers($scope.week);
  });
});