angular.module('iteam-dashboard').controller('ProjectCtrl', function ($scope, week) {
  'use strict';

  $scope.weekSelect = function (index) {
    $scope.activeWeek = $scope.weeks[index];
  };

  // TOOD: parse from stateparams
  $scope.activeSlider = $scope.weeks.indexOf($scope.activeWeek);

  $scope.$watch('activeWeek', function (activeWeek) {
    activeWeek.projects = week.getProjects(activeWeek.yearWeek);
  }, true);

  $scope.activeWeek.projects = week.getProjects($scope.activeWeek.yearWeek);

});