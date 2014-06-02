angular.module('iteam-dashboard').service('user', function (project) {
  'use strict';

  var user = {
    getUsers : function(week){
      var projects = project.getProjects(week);
      return Object.keys(projects).reduce(function(users, projectId){
        var project = projects[projectId];
        Object.keys(project.users).forEach(function(userId){
          var user = project.users[userId];
          users[userId] = user;
        });
        return users;
      }, {});
    }
  };

  return user;
});