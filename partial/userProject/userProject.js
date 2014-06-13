angular.module('iteam-dashboard').controller('UserProjectCtrl', function ($scope, week, project, $stateParams) {
  'use strict';

  $scope.yearWeek = $stateParams.yearWeek;
  $scope.week = week.getWeek($scope.yearWeek);

  $scope.week.$promise.then(function(){
    $scope.projects = project.getProjects($scope.week);
    $scope.userProjects = Object.keys($scope.projects).reduce(function(userProjects, projectId){
      
      var project = $scope.projects[projectId];
      Object.keys(project.users).forEach(function(userName){
        var user = project.users[userName];
        userProjects.push({
          user: userName,
          project: project.name,
          color: project.department && ((project.department === 'Iteam' && 'red') || (project.department.indexOf('Dev') >= 0 && 'green')) || 'blue', 
          department: project.department,
          planned: user.planned || 0,
          reported: user.reported || 0
        });
      });
      return userProjects;

    }, []);
  });

});