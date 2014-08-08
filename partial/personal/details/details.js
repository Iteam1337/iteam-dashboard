angular.module('iteam-dashboard').controller('PersonalDetailsCtrl', function ($scope, $stateParams) {
  'use strict';

  $scope.activeSlide = $scope.weeks.indexOf($scope.activeWeek);
  $scope.user = $stateParams.user;
  
  // week.getProjectsForUser(scope.yearweek.yearWeek, scope.user)
  //         .then(function (filteredProjects) {
  //         });
});