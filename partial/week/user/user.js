angular.module('iteam-dashboard').controller('WeekUserCtrl', function ($scope, user) {
  'use strict';
  
  $scope.users = user.getUsers($scope.week);

});