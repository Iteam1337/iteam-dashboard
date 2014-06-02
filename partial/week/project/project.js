angular.module('iteam-dashboard').controller('WeekProjectCtrl', function ($scope, project) {
  'use strict';

  $scope.projects = project.getProjects($scope.week);

});