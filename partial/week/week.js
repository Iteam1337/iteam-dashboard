angular.module('iteam-dashboard').controller('WeekCtrl', function ($scope) {
  'use strict';

  $scope.users = ['abo', 'cln', 'rfr', 'rln', 'jgn', 'hrn', 'ram', 'jok', 'sru', 'acr', 'mln', 'dpn'].sort();
  

  $scope.weeks = [-5, -4, -3, -2, -1, 0, 1].map(function(delta){
    var date = moment().add('days', 7 * delta);
    return {
      year: date.year(),
      week: date.isoWeek(),
      delta : delta,
      toString : function(){
        return this.year + '' + this.week;
      }
    };
  });
  
  $scope.exampleData = [
    {
      key: 'One',
      y: 5
    },
    {
      key: 'Two',
      y: 2
    },
    {
      key: 'Three',
      y: 9
    },
    {
      key: 'Four',
      y: 7
    },
    {
      key: 'Five',
      y: 4
    },
    {
      key: 'Six',
      y: 3
    },
    {
      key: 'Seven',
      y: 9
    }
  ];

  $scope.xFunction = function(){
    return function(d) {
      return d.key;
    };
  };

  $scope.yFunction = function(){
    return function(d) {
      return d.y;
    };
  };
});