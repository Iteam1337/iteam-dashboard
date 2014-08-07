angular.module('iteam-dashboard').controller('ProjectCtrl', function ($scope, week) {
  'use strict';

  $scope.activeSlider = 5;
  $scope.activeWeek.yearWeek = $scope.weeks[$scope.activeSlider].yearWeek;

  $scope.weeks[$scope.activeSlider].projects = week.getProjects(week.getYearWeek());

  $scope.weekSelect = function (index) {
    $scope.activeWeek.yearWeek = $scope.weeks[index].yearWeek;
    $scope.weeks[index].projects = week.getProjects($scope.activeWeek.yearWeek);
  };
});