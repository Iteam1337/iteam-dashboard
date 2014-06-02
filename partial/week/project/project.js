angular.module('iteam-dashboard').controller('WeekProjectCtrl', function ($scope, project) {
  'use strict';

  $scope.week.$promise.then(function(){
    $scope.projects = project.getProjects($scope.week);
  });

});