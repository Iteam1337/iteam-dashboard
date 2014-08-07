angular.module('iteam-dashboard').controller('PersonalDetailsCtrl', function ($scope, $stateParams) {
  'use strict';

  $scope.activeSlide = $scope.activeWeek.index;
  $scope.user = $stateParams.user;

});