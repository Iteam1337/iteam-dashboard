angular.module('iteam-dashboard').controller('TabsCtrl', function ($scope, week, $state) {
  'use strict';
  $scope.currentWeek = week.getYearWeek(Date.now());
 
  $scope.goToProjects = function () {
    $state.go('tab.weekproject', { yearweek: $scope.currentWeek });
  };

  $scope.goToPersonal = function () {
    $state.go('tab.personal', { yearweek: $scope.currentWeek });
  };
});