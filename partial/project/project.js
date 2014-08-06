angular.module('iteam-dashboard').controller('ProjectCtrl', function ($scope, $state, $stateParams, week, project) {
  'use strict';

  $scope.activeSlider = 5;

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

// Move getProjects to week service
  function getProjects(yearWeek) {
    $scope.week = week.getWeekHours(yearWeek);
    $scope.week.$promise
      .then(function() {
        $scope.projects = project.getProjects($scope.week);
      });
  }
  
  getProjects($scope.weeks[$scope.activeSlider].toString());
     

  $scope.weekSelect = function (index) {
    $scope.projects = [];
    getProjects($scope.weeks[index].toString());
  };
});