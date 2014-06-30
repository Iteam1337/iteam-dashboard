angular.module('iteam-dashboard').controller('ProjectWeekUserCtrl', function ($scope, $stateParams, user) {
  'use strict';
  $scope.users = user.getProjectUsers($scope.week, $stateParams.project);
});