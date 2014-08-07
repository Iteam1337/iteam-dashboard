angular.module('iteam-dashboard').controller('ProjectDetailsCtrl', function ($scope, $stateParams, week, colors, avatar) {
  'use strict';
  // week.getUsersForProject($scope.activeWeek.yearWeek, $stateParams.projectId)
  // .then(function (filtered) {
  //   $scope.users = filtered;
  // });

  function randomNumber(max) {
    return Math.max(Math.round(Math.random() * (max || 5)), 2);
  }
  function randomUser() {
    var max = users.length;
    var index = Math.round(Math.random() * max) % max;
    return users.splice(index, 1)[0];
  }
  function Personal() {
    var person = {
      'user': randomUser(),
      'planned': randomNumber(),
      'reported': randomNumber()
    };

    var fill = person.planned === person.reported ? false : {};
    if (!fill) {
      return [person];
    }
    if (person.planned < person.reported) {
      fill = {
        'planned_fill': person.reported - person.planned
      };
    } else if (person.reported < person.planned) {
      fill = {
        'reported_fill': person.planned - person.reported
      };
    }

    return [person, fill];
  }

  function generate() {
    var array = [];
    // var max = randomNumber(numberOfUsers);
    var max = numberOfUsers;
    for (var i = 0, personal; i < max; i++) {
      personal = new Personal();
      for (var j = 0; j < personal.length; j++) {
        array.push(personal[j]);
      }
    }
    return [].concat(array);
  }


  var users = ['abo', 'acr', 'cln', 'dpn', 'jgn', 'jok', 'mln', 'ram', 'rln'];
  var numberOfUsers = users.length;

  $scope.data_1 = generate();

  $scope.avatar = function (user) {
    return avatar.generate(user, { size: 40, team: true });
  };

  $scope.color = function (key, darker) {
    key = key + '_fill';
    return function (d, index) {
      var fill = d.data[key] !== undefined;
      if (fill) {
        return 'fff';
      }
      var user = d.data.user || '';
      var color = colors.getColor(user);
      return darker ? colors.shade(color, 10) : color;
    };
  };

  $scope.get = function (key) {
    var fill = key + '_fill';
    return function (d) {
      if (!!d[fill]) {
        return d[fill];
      }
      return d[key] || 0;
    };
  };
});