angular.module('iteam-dashboard').controller('MenuCtrl', function ($scope, $state) {
  'use strict';

  $scope.$watch('yearWeek', function(yearWeek){
    if (yearWeek){
      $state.go('week', {yearWeek: yearWeek});
    }
  });

});