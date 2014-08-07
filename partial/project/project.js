angular.module('iteam-dashboard').controller('ProjectCtrl', function ($scope, week) {
  'use strict';

  $scope.activeSlider = 5;

  $scope.weeks[$scope.activeSlider].projects = week.getProjects(week.getYearWeek());

  $scope.weekSelect = function (index) {
    var activeWeek = $scope.weeks[index];
    $scope.weeks[index].projects = week.getProjects(activeWeek.yearWeek);
  };
});