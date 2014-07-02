angular.module('iteam-dashboard', ['ngResource', 'ionic', 'nvd3ChartDirectives']);

angular.module('iteam-dashboard').config(function ($stateProvider, $urlRouterProvider) {
  'use strict';

  $stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'partial/tabs/tabs.html',
    controller: 'TabsCtrl'
  });

  $stateProvider.state('tab.personal', {
    url: '/personal/:yearweek',
    views: {
      'personal-tab': {
        templateUrl: 'partial/week/week.html',
        controller: 'WeekCtrl'
      }
    }
  });

  $stateProvider.state('tab.user', {
    url: '/personal/:yearweek/:user',
    views: {
      'personal-tab': {
        templateUrl: 'partial/week/user/user.html',
        controller: 'WeekUserCtrl'
      }
    }
  });

  $stateProvider.state('tab.weekproject', {
    url: '/project/:yearweek',
    views: {
      'project-tab': {
        templateUrl: 'partial/projectWeek/projectWeek.html',
        controller: 'ProjectWeekCtrl'
      }
    }
  });

  $stateProvider.state('tab.project', {
    url: '/project/:yearweek/:project',
    views: {
      'project-tab': {
        templateUrl: 'partial/projectWeek/user/user.html',
        controller: 'ProjectWeekUserCtrl'
      }
    }
  });


	/* Add New Routes Above */

  
  // For any unmatched url, redirect to /
 $urlRouterProvider.otherwise('/tab/personal/');

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