angular.module('iteam-dashboard', ['ngResource', 'ionic', 'nvd3ChartDirectives']);

angular.module('iteam-dashboard').config(function ($stateProvider, $urlRouterProvider) {
  'use strict';

  // $stateProvider.state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'partial/tabs/tabs.html',
  //   controller: 'TabsCtrl'
  // });


  $stateProvider.state('tab.user', {
    url: '/personal/:yearweek/:user',
    views: {
      'personal-tab': {
        templateUrl: 'partial/week/user/user.html',
        controller: 'WeekUserCtrl'
      }
    }
  });
 

  $stateProvider.state('personal', {
    url: '/personal',
    views: {
      'personal-tab': {
        templateUrl: 'partial/week/week.html',
        controller: 'WeekCtrl'
      }
    }
  });
// TODO:
// optional week for detail route
  $stateProvider.state('project', {
    url: '/project',
    views: {
      'project-tab': {
        templateUrl: 'partial/projectWeek/projectWeek.html',
        controller: 'ProjectWeekCtrl'
      }
    }
  });
	/* Add New Routes Above */

  
  // For any unmatched url, redirect to /
 $urlRouterProvider.otherwise('/personal');

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