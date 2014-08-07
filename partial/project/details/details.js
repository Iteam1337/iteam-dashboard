angular.module('iteam-dashboard').controller('ProjectDetailsCtrl', function ($scope, $stateParams, week) {
  'use strict';
  week.getUsersForProject($scope.activeWeek.yearWeek, $stateParams.projectId)
    .then(function (filtered) {
      $scope.users = filtered;
    });
});