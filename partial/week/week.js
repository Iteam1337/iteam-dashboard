angular.module('iteam-dashboard').controller('WeekCtrl', function ($scope, week, $stateParams) {
  'use strict';

  $scope.week = week.getWeek($stateParams.yearWeek);
  $scope.yearWeek = $stateParams.yearWeek;

});