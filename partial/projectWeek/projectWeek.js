angular.module('iteam-dashboard').controller('ProjectWeekCtrl', function ($scope, $state, $stateParams, week, project) {
  'use strict';

  if(!$stateParams.yearWeek) {
    $scope.yearWeek = moment().year() + '' + moment().isoWeek();
  } else {
    $scope.yearWeek = $stateParams.yearWeek;
  }

  $scope.week = week.getWeekHours($scope.yearWeek);


  $scope.week.$promise.then(function () {
    $scope.projects = project.getProjects($scope.week);    
  });  
});