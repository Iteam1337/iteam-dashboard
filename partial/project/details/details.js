angular.module('iteam-dashboard').controller('ProjectDetailsCtrl', function ($scope, $stateParams, week, colors) {
  'use strict';
  function bindUsers() {
    week.getUsersForProject($scope.activeWeek.yearWeek, $stateParams.projectId)
      .then(function (filtered) {
        $scope.activeWeek.filteredUsers = filtered;
        if (!$scope.project) {
          $scope.project = $scope.activeWeek.projects[$stateParams.projectId];
        }
      });
  }

  $scope.weekSelect = function (index) {
    $scope.activeWeek = $scope.weeks[index];
  };

  // TOOD: parse from stateparams
  $scope.activeSlider = $scope.weeks.indexOf($scope.activeWeek);

  $scope.$watch('activeWeek', function (activeWeek) {
    bindUsers();
  }, true);

  $scope.project = null;

  bindUsers();

});