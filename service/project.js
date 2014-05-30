angular.module('iteam-dashboard').service('project', function () {
  'use strict';

  var project = {
    getProjects : function(week){
      var projects = week.planned.reduce(function(hashMap, alotment){

        /*
          1525:
            name: besedo
            users: 
              rfr: 
                planned: 34
          ...
         */

        var project = hashMap[alotment.ProjectId] = hashMap[alotment.ProjectId] || {};
        project.name = alotment.ProjectName;
        project.department = alotment.ProjectDepartment;

        project.users = alotment.PlannedHoursPerEmployee.reduce(function(users, plannedUser){
          var user = users[plannedUser.EmployeeShortName] = users[plannedUser.EmployeeShortName] || {};
          Object.keys(plannedUser.PlannedHoursPerRole).forEach(function(type){
            user.planned = (user.planned || 0) + plannedUser.PlannedHoursPerRole[type];
            user.types = user.types || {};
            user.types[type] = plannedUser.PlannedHoursPerRole[type];
          });
          return users;

        }, project.users || {});

        return hashMap;
      }, {});

      projects = week.reported.reduce(function(hashMap, hour){

        /*
          1525:
            name: besedo
            users: 
              rfr: 
                reported: 34
          ...
         */

        var project = hashMap[hour.ProjectId] = hashMap[hour.ProjectId] || (
          // Traverse through the parents tree to find a project or create a new one
          hour.ParentProjectIds.filter(function(parentId){
            return hashMap[parentId];
          }).pop() || {}
        );

        project.users = project.users || {};
        var user = project.users[hour.EmployeeShortName] = project.users[hour.EmployeeShortName] || {};
        user.reported = (user.reported || 0) + hour.NumberOfHours;
        /*user.reported.details = user.reported.details || {};
        user.reported.details[hour.ProjectId] = (user.reported.details[hour.ProjectId] || 0) + hour.NumberOfHours;
        user.reported.details[hour.ProjectId].startDate = hour.StartDate;
        user.reported.details[hour.ProjectId].reported = hour.ReportedDate;*/

        return hashMap;
      }, projects);

      return projects;

    }

  };

  return project;
});