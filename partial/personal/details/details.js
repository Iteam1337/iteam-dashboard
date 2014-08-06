angular.module('iteam-dashboard').controller('PersonalDetailsCtrl', function ($scope, $stateParams) {
  'use strict';

  $scope.activeSlide = 5;
  $scope.user = $stateParams.user;

  $scope.weeks = [-5, -4, -3, -2, -1, 0, 1].map(function(delta){
    var date = moment().add('days', 7 * delta);
    return {
      year: date.year(),
      week: date.isoWeek(),
      delta : delta,
      toString : function(){
        return this.year + '' + this.week;
      }
    };
  });

  $scope.slideHasChanged = function(index){

  };
});