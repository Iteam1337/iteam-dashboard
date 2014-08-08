angular.module('iteam-dashboard').controller('PersonalDetailsCtrl', function ($scope, $stateParams) {
  'use strict';

  $scope.activeSlide = $scope.weeks.indexOf($scope.activeWeek);
  $scope.user = $stateParams.user;

});