angular.module('iteam-dashboard').controller('ProjectWeekUserCtrl', function ($scope, $stateParams, user) {
  'use strict';
  console.log($scope.week);
  $scope.users = user.getProjectUsers($scope.week, $stateParams.project);
});