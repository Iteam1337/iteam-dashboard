angular.module('iteam-dashboard').controller('PersonalCtrl', function ($scope, week) {
  'use strict';

  // TODO: currentWeeks.length - 1 from factory
  $scope.activeSlider = 5;

  $scope.weekSelect = function (index) {
    var activeWeek = $scope.weeks[index];
    $scope.weeks[index].users = week.getUsers(activeWeek.yearWeek);
  };

  $scope.weeks[$scope.activeSlider].users = week.getUsers(week.getYearWeek());

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