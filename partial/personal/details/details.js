angular.module('iteam-dashboard').controller('PersonalDetailsCtrl', function ($scope, $stateParams, week) {
  'use strict';

  function bindProjects() {
    week.getProjectsForUser($scope.activeWeek.yearWeek, $scope.user)
      .then(function (filtered) {
        $scope.activeWeek.filteredProjects = filtered;
        $scope.$emit('shotsFired', filtered);
      });
  }

  $scope.activeSlider = $scope.weeks.indexOf($scope.activeWeek);
  $scope.user = $stateParams.user;

  $scope.$watch('activeWeek', function (activeWeek) {
    bindProjects();
  }, true);

  bindProjects();
});