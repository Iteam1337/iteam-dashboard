angular.module('iteam-dashboard', ['ngResource', 'ionic', 'nvd3ChartDirectives']);

angular.module('iteam-dashboard').config(function ($stateProvider, $urlRouterProvider) {
  'use strict';

  $stateProvider.state('week', {
    url: '',
    abstract: true,
    views: {
      'main-view': {
        templateUrl: 'partial/week/week.html'
      },
      'menu': {
        templateUrl: 'partial/menu/menu.html'
      }     
    }
  });



  $stateProvider.state('week.personal', {
    url: '/personal',
    views: {
      'personal-tab': {
        templateUrl: 'partial/personal/personal.html',
        controller: 'PersonalCtrl'
      }
    }
  });

  $stateProvider.state('week.personalDetails', {
    url: '/personal/:user',
    views: {
      'personal-tab': {
        templateUrl: 'partial/personal/details/details.html',
        controller: 'PersonalDetailsCtrl'
      }
    }
  });

// TODO:
// optional week for detail route
  $stateProvider.state('week.project', {
    url: '/project',
    views: {
      'project-tab': {
        templateUrl: 'partial/project/project.html',
        controller: 'ProjectCtrl'
      }
    }
  });

  $stateProvider.state('week.projectDetails', {
    url: '/project/:projectId',
    views: {
      'project-tab': {
        templateUrl: 'partial/project/details/details.html',
        controller: 'ProjectDetailsCtrl'
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