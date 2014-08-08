angular.module('iteam-dashboard').controller('PersonalCtrl', function ($scope, week) {
  'use strict';


  $scope.weekSelect = function (index) {
    $scope.activeWeek = $scope.weeks[index];
  };

  // TOOD: parse from stateparams
  $scope.activeSlider = $scope.weeks.indexOf($scope.activeWeek);

  $scope.$watch('activeWeek', function (activeWeek) {
    activeWeek.users = week.getUsers(activeWeek.yearWeek);
  }, true);

  $scope.activeWeek.users = week.getUsers($scope.activeWeek.yearWeek);

  $scope.exampleData = [
    {
      key: 'One',
      y: 5
    },
    {
      key: 'Two',
      y: 2
    },
    {
      key: 'Three',
      y: 9
    },
    {
      key: 'Four',
      y: 7
    },
    {
      key: 'Five',
      y: 4
    },
    {
      key: 'Six',
      y: 3
    },
    {
      key: 'Seven',
      y: 9
    }
  ];

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