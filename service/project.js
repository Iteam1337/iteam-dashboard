angular.module('iteam-dashboard').service('project', function () {
  'use strict';

  var project = {
    getProjects : function(week){
      /*
        Convert planned hours to a hashmap of projects and users
      */
      var projects = week.planned.reduce(function(hashmap, alotment){

        /*
          1525:
            name: besedo
            users: 
              rfr: 
                planned: 34
          ...
         */

        var project = hashmap[alotment.ProjectId] = hashmap[alotment.ProjectId] || {};
        project.name = alotment.ProjectName;
        project.department = alotment.ProjectDepartment;

        project.users = alotment.PlannedHoursPerEmployee.reduce(function(users, plannedUser){
          var user = users[plannedUser.EmployeeShortName.toLowerCase()] = users[plannedUser.EmployeeShortName.toLowerCase()] || {};
          Object.keys(plannedUser.PlannedHoursPerRole).forEach(function(type){
            user.planned = +parseFloat(+(user.planned || 0) + plannedUser.PlannedHoursPerRole[type]).toFixed(2);
            user.types = user.types || {};
            user.types[type] = plannedUser.PlannedHoursPerRole[type];
          });
          return users;

        }, project.users || {});

        return hashmap;
      }, {});



      /*
        Convert reported hours to a hashmap of projects and users
       */
      projects = week.reported.reduce(function(hashmap, hour){

        /*
          1525:
            name: besedo
            users: 
              rfr: 
                reported: 34
          ...
         */

        var projectId = hashmap[hour.ProjectId] ? hour.ProjectId : hour.ParentProjectIds.filter(function(parentId){
          return hashmap[parentId];
        }).pop() || 'unplanned';

        var project = hashmap[projectId] = hashmap[projectId] || { name : 'Unplanned'};

        project.users = project.users || {};
        var user = project.users[hour.EmployeeShortName.toLowerCase()] = project.users[hour.EmployeeShortName.toLowerCase()] || {};
        user.reported = +parseFloat(parseFloat(user.reported || 0) + hour.NumberOfHours).toFixed(2);
        /*user.reported.details = user.reported.details || {};
        user.reported.details[hour.ProjectId] = (user.reported.details[hour.ProjectId] || 0) + hour.NumberOfHours;
        user.reported.details[hour.ProjectId].startDate = hour.StartDate;
        user.reported.details[hour.ProjectId].reported = hour.ReportedDate;*/

        return hashmap;
      }, projects);

      // summary of all reported and planned hours for each project
      Object.keys(projects).forEach(function(projectId){
        var project = projects[projectId];
        project.summary = Object.keys(project.users).reduce(function(summary, userName){
          var user = project.users[userName];
          summary.planned = (summary.planned || 0) + (user.planned || 0);
          summary.reported = (summary.reported || 0) + (user.reported || 0);
          // TODO: more key facts.. 
          return summary;
        }, {});
      });

      return projects;

    }

  };

  return project;
});