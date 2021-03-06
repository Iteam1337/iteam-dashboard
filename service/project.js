angular.module('iteam-dashboard').service('project', function () {
  'use strict'
  var colorSet = ['#AABBCC', '#7C786A', '#8DCDC1', '#D3E397', '#FDEC96', '#EB6E44']

  var project = {
    getProjects: function (weekHours) {
      /*
        Convert planned hours to a hashmap of projects and users
      */
      window.calendar = weekHours.calendar

      var projects = weekHours.planned.reduce(function (hashmap, alotment) {
        /*
          1525:
            name: besedo
            users:
              rfr:
                planned: 34
          ...
         */

        var project = hashmap[alotment.ProjectId] = hashmap[alotment.ProjectId] || {}
        project.name = alotment.ProjectName
        project.department = alotment.ProjectDepartment

        project.users = alotment.PlannedHoursPerEmployee.reduce(function (users, plannedUser) {
          var user = users[plannedUser.EmployeeShortName.toLowerCase()] = users[plannedUser.EmployeeShortName.toLowerCase()] || {}
          Object.keys(plannedUser.PlannedHoursPerRole).forEach(function (type) {
            user.planned = +parseFloat(+(user.planned || 0) + plannedUser.PlannedHoursPerRole[type]).toFixed(2)
            user.reported = +parseFloat(+(user.reported || 0) + (user.reported || 0)).toFixed(2)
            user.calendar = +parseFloat(+(user.calendar || 0) + (user.calendar || 0)).toFixed(2)
            user.types = user.types || {}
            user.types[type] = plannedUser.PlannedHoursPerRole[type]
          })
          return users
        }, project.users || {})

        return hashmap
      }, {})

      /*
        Convert reported hours to a hashmap of projects and users
       */
      projects = weekHours.reported.reduce(function (hashmap, hour) {
        /*
          1525:
            name: besedo
            users:
              rfr:
                reported: 34
          ...
         */
        // console.log(hashmap)
        var projectId = hashmap[hour.ProjectId] ? hour.ProjectId : hour.ParentProjectIds.filter(function (parentId) {
          return hashmap[parentId]
        }).pop() || 'unplanned'

        var project = hashmap[projectId] = hashmap[projectId] || {name: 'Unplanned'}

        project.users = project.users || {}
        var user = project.users[hour.EmployeeShortName.toLowerCase()] = project.users[hour.EmployeeShortName.toLowerCase()] || {}
        user.planned = (user.planned || 0)
        user.reported = +parseFloat(parseFloat(user.reported || 0) + hour.NumberOfHours).toFixed(2)
        user.calendar = (user.calendar || 0)

        return hashmap
      }, projects)

      /*
        Convert calendar hours to a hashmap of projects and users
       */
      projects = weekHours.calendar.reduce(function (hashmap, hour) {
        var projectId = hashmap[hour.ProjectId] ? hour.ProjectId : hour.ParentProjectIds.filter(function (parentId) {
          return hashmap[parentId]
        }).pop() || 'unplanned'

        var project = hashmap[projectId] = hashmap[projectId] || {name: 'Unplanned'}

        project.users = project.users || {}
        var user = project.users[hour.EmployeeShortName.toLowerCase()] = project.users[hour.EmployeeShortName.toLowerCase()] || {}
        user.planned = (user.planned || 0)
        user.reported = (user.reported || 0)
        user.calendar = +parseFloat(parseFloat(user.calendar || 0) + hour.NumberOfHours).toFixed(2)
        return hashmap
      }, projects)

      // summary of all reported and planned hours for each project
      Object.keys(projects).map(function (projectId) {
        var project = projects[projectId]
        project.projectId = projectId
        project.summary = Object.keys(project.users).reduce(function (summary, userName) {
          var user = project.users[userName]
          summary.planned = (summary.planned || 0) + (user.planned || 0)
          summary.reported = (summary.reported || 0) + (user.reported || 0)
          // TODO: more key facts..
          return summary
        }, {})
        return project
      }).sort(function (a, b) {
        return a.planned - b.planned
      }).forEach(function (project) {
        project.color = colorSet[(parseInt(project.projectId, 10)) % colorSet.length] || 'rgba(0,0,0,0.2)'
      })
      // console.log(projects)
      return projects
    },
    getWeekHoursSummary: function (weekHours) {
      var projects = project.getProjects(weekHours)
      return Object.keys(projects).reduce(function (userProjects, projectId) {
        var project = projects[projectId]

        Object.keys(project.users).forEach(function (userName) {
          var user = project.users[userName]
          userProjects.push({
            user: userName,
            project: project.name,
            projectId: projectId,
            color: project.color, // project.department && ((project.department === 'Iteam' && 'red') || (project.department.indexOf('Dev') >= 0 && 'green')) || 'blue',
            department: project.department,
            planned: user.planned || 0,
            reported: user.reported || 0,
            calendar: user.calendar || 0
          })
        })
        return userProjects
      }, [])
    }
  }

  return project
})
