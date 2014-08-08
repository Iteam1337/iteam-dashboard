angular.module('iteam-dashboard').controller('ProjectCtrl', function ($scope, week) {
  'use strict';

  // TOOD: parse from stateparams
  $scope.activeSlider = $scope.weeks.indexOf($scope.activeWeek);

});