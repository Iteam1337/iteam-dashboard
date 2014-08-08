angular.module('iteam-dashboard').controller('ProjectDetailsCtrl', function ($rootScope, $scope, $stateParams, week, colors) {
  'use strict';
  function bindUsers() {
    week.getUsersForProject($rootScope.activeWeek.yearWeek, $stateParams.projectId)
      .then(function (filtered) {
        $rootScope.activeWeek.filteredUsers = filtered;
        $scope.project = $rootScope.activeWeek.projects[$stateParams.projectId];
      });
  }

  // TOOD: parse from stateparams
  $scope.activeSlider = $rootScope.weeks.indexOf($rootScope.activeWeek);

  $rootScope.$watch('activeWeek', function (activeWeek) {
    bindUsers();
  }, true);

  bindUsers();

});