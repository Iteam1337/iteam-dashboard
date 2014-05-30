angular.module('iteam-dashboard').controller('MenuCtrl', function ($scope, $state) {
  'use strict';
  $scope.weeks = [0,-1,-2,-3,-4].map(function(delta){
    var date = moment().add('days', 7 * delta);
    return {
      year: date.year(),
      week: date.isoWeek()
    };
  });

  $scope.$watch('yearWeek', function(yearWeek){
    if (yearWeek){
      $state.go('week', {yearWeek: yearWeek});
    }
  });

});