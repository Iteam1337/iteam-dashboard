angular.module('iteam-dashboard').controller('ProjectCtrl', function ($scope, week) {
  'use strict';

  $scope.activeSlider = $scope.activeWeek.index;

  $scope.$watch('activeWeek.yearWeek', function () {
    $scope.weeks[$scope.activeWeek.index].projects = week.getProjects($scope.activeWeek.yearWeek);
  });

  $scope.weeks[$scope.activeWeek.index].projects = week.getProjects($scope.activeWeek.yearWeek);
  
});