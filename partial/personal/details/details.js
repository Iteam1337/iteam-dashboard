angular.module('iteam-dashboard').controller('PersonalDetailsCtrl', function ($rootScope, $scope, $stateParams, week) {
  'use strict'

  function bindProjects () {
    week.getProjectsForUser($rootScope.activeWeek.yearWeek, $scope.user)
      .then(function (filtered) {
        $rootScope.activeWeek.filteredProjects = filtered
        $rootScope.$emit('filteredProjectsChanged', filtered)
      })
  }

  $scope.activeSlider = $rootScope.weeks.indexOf($rootScope.activeWeek)
  $scope.user = $stateParams.user

  $rootScope.$watch('activeWeek', function (activeWeek) {
    bindProjects()
  }, true)

  bindProjects()
})
