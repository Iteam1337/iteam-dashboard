angular.module('iteam-dashboard').controller('ProjectDetailsCtrl', function ($scope, $stateParams, user) {
  'use strict';

  $scope.users = user.getProjectUsers($scope.week, $stateParams.project);
  $scope.exampleData = [];

  angular.forEach($scope.users, function (value, key) {
    if (!value || !value.planned) {
      return;
    }
    $scope.exampleData.push({
      'key': key,
      'y': value.planned
    });
  });

  $scope.xFunction = function(){
    return function(d) {
      return d.key;
    };
  };

  $scope.yFunction = function(){
    return function(d) {
      return d.y;
    };
  };

});