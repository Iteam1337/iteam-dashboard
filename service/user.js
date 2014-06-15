angular.module('iteam-dashboard').service('user', function(project) {
  'use strict';

  var user = {
    getUsers: function(week) {
      var projects = project.getProjects(week);
      return Object.keys(projects).reduce(function(users, projectId) {
        var project = projects[projectId];
        Object.keys(project.users).forEach(function(userId) {
          var user = project.users[userId];
          var existing = users[userId];
          if (existing) {
            // merge

            existing.planned = +parseFloat(+(existing.planned || 0) + (user.planned || 0)).toFixed(2);
            existing.reported = +parseFloat(+(existing.reported || 0) + (user.reported || 0)).toFixed(2);

          } else {
            users[userId] = user;
          }
        });
        return users;
      }, {});
    },
    getPersonalSummary: function(weekHours, userName){
      // TODO: do it
      // 
      return userName + ' fick en stor sudd igen på projektet X, förutom det finns det mest småduttar på fyra mindre interna projekt.';
    }
  };

  return user;
});