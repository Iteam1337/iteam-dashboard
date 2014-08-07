angular.module('iteam-dashboard').controller('PersonalCtrl', function ($scope, week, user, $window) {
  'use strict';

//  currentWeeks.length - 1 from factory
  $scope.activeSlider = 5;

//  TODO: move to factory -> array
  $scope.weeks = [-5, -4, -3, -2, -1, 0, 1].map(function(delta){
    var date = $window.moment().add('days', 7 * delta);
    return {
      year: date.year(),
      week: date.isoWeek(),
      delta : delta,
      toString : function(){
        return this.year + '' + this.week;
      }
    };
  });

// Move getUsers to week service
  function getUsers(yearWeek) {
    var weekSummary = week.getWeekHours(yearWeek);
    weekSummary.$promise
      .then(function() {
        $scope.users = user.getUsers(weekSummary);
      });
  }

  getUsers($scope.weeks[$scope.activeSlider].toString());

  $scope.weekSelect = function (index) {
    $scope.users = [];
    getUsers($scope.weeks[index].toString());
  };
});