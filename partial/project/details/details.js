angular.module('iteam-dashboard').controller('ProjectDetailsCtrl', function ($scope, $stateParams, week) {
  'use strict';
  
  $scope.activeSlide = $scope.activeWeek.index;

  week.getUsersForProject($scope.activeWeek.yearWeek, $stateParams.projectId)
    .then(function (filtered) {
      $scope.users = filtered;
    });
});