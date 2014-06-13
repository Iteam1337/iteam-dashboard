angular.module('iteam-dashboard').controller('WeekCtrl', function ($scope, week, $stateParams) {
  'use strict';

  $scope.week = week.getWeek($stateParams.yearWeek || week.getYearWeek(new Date()));
  $scope.yearWeek = $stateParams.yearWeek;


  $scope.weeks = [1, 0,-1,-2,-3,-4,-5,-6].map(function(delta){
    var date = moment().add('days', 7 * delta);
    return {
      year: date.year(),
      week: date.isoWeek(),
      delta : delta
    };
  });

});