angular.module('iteam-dashboard', ['ngResource', 'ionic']);

angular.module('iteam-dashboard').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  'use strict';

  $stateProvider.state('week', {
    url: '/week/:yearWeek',
    templateUrl: 'partial/week/week.html'
  });
	$stateProvider.state('weekproject', {
    url: '/week/:yearWeek/projects',
    templateUrl: 'partial/week/project/project.html'
  });
	$stateProvider.state('weekuser', {
    url: '/week/:yearWeek/users',
    templateUrl: 'partial/week/user/user.html'
  });
	/* Add New Routes Above */
  //$locationProvider.html5Mode(true);
  
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');

});

angular.module('iteam-dashboard').run(function ($rootScope) {
  'use strict';

  $rootScope.safeApply = function (fn) {
    var phase = $rootScope.$$phase;
    if (phase === '$apply' || phase === '$digest') {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

});