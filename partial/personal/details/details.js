angular.module('iteam-dashboard').controller('PersonalDetailsCtrl', function ($scope, $stateParams) {
  'use strict';

  $scope.activeSlide = 5;
  $scope.user = $stateParams.user;

  $scope.slideHasChanged = function(index){

  };
});