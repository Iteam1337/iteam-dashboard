angular.module('iteam-dashboard').service('user', function (project) {
  'use strict'

  var user = {
    getUsers: function (week) {
      var projects = project.getProjects(week)
      return Object.keys(projects).reduce(function (users, projectId) {
        var project = projects[projectId]
        Object.keys(project.users).forEach(function (userId) {
          var user = project.users[userId]
          var existing = users[userId]
          if (existing) {
            // merge

            existing.planned = +parseFloat(+(existing.planned || 0) + (user.planned || 0)).toFixed(2)
            existing.reported = +parseFloat(+(existing.reported || 0) + (user.reported || 0)).toFixed(2)
            existing.calendar = +parseFloat(+(existing.calendar || 0) + (user.calendar || 0)).toFixed(2)
          } else {
            users[userId] = user
          }
        })
        return users
      }, {})
    },
    getPersonalSummary: function (projects, userName) {
      var projectCopy = []
        .concat(projects)
        .reduce(function (object, project) {
          var key = project.planned
          if (object[key]) {
            object[key].push(project)
          } else {
            object[key] = [project]
          }
          return object
        }, {})

      var sortedProjects = Object.keys(projectCopy).sort(function (a, b) {
        return b - a
      }).map(function (planned) {
        return projectCopy[planned]
      })

      if (!sortedProjects || !sortedProjects[0]) {
        return
      }

      // TODO: do it
      var string = '{userName} fick störst sudd på "{largest}"'
      var second = ', därefter finns det tid för "{second}"'
      string = string
        .replace('{userName}', userName)
        .replace('{largest}', sortedProjects[0][0].project)

      if (!!sortedProjects[1] && !!sortedProjects[1][0]) {
        string += second.replace('{second}', sortedProjects[1][0].project)
      }

      return string
    // return userName + ' fick en stor sudd igen på projektet X, förutom det finns det mest småduttar på fyra mindre interna projekt.'
    }
  }

  return user
})
