angular.module('iteam-dashboard').controller('WeekCtrl', function ($scope, week, $state) {
  'use strict';

  $scope.goTo = function (state) {
    $state.go(state);
  };

  $scope.weeks = [-5, -4, -3, -2, -1, 0, 1].map(function(delta){
    var date = moment().add('days', 7 * delta);
    var week = {
      yearWeek: date.year() + '' + date.isoWeek(),
      year: date.year(),
      week: date.isoWeek(),
      delta : delta,
      projects: {},
      users: {}
    };
    return week;
  });

  $scope.weekSelect = function (index) {
    $scope.activeWeek = $scope.weeks[index];
  };

  $scope.activeWeek = $scope.weeks.slice(-2)[0];

  $scope.$watch('activeWeek', function (activeWeek) {
    activeWeek.projects = week.getProjects(activeWeek.yearWeek);
    activeWeek.users = week.getUsers(activeWeek.yearWeek);
  }, true);
}); 