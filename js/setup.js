angular.module('iteam-dashboard', ['ngResource', 'ionic', 'nvd3ChartDirectives'])

// global script. TODO: move to directive

angular.module('iteam-dashboard').config(function ($stateProvider, $urlRouterProvider) {
  'use strict'

  $stateProvider.state('personal', {
    url: '/personal',
    views: {
      'personal-tab': {
        templateUrl: 'partial/personal/personal.html',
        controller: 'PersonalCtrl'
      }
    }
  })

  $stateProvider.state('personalDetails', {
    url: '/personal/:user',
    views: {
      'personal-tab': {
        templateUrl: 'partial/personal/details/details.html',
        controller: 'PersonalDetailsCtrl'
      }
    }
  })

  // TODO:
  // optional week for detail route
  $stateProvider.state('project', {
    url: '/project',
    views: {
      'project-tab': {
        templateUrl: 'partial/project/project.html',
        controller: 'ProjectCtrl'
      }
    }
  })

  $stateProvider.state('projectDetails', {
    url: '/project/:projectId',
    views: {
      'project-tab': {
        templateUrl: 'partial/project/details/details.html',
        controller: 'ProjectDetailsCtrl'
      }
    }
  })

  /* Add New Routes Above */

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/personal')
})

angular.module('iteam-dashboard').run(function ($rootScope, week, $state) {
  'use strict'

  $rootScope.goTo = function (state) {
    $state.go(state)
  }

  $rootScope.safeApply = function (fn) {
    var phase = $rootScope.$$phase
    if (phase === '$apply' || phase === '$digest') {
      if (fn && (typeof (fn) === 'function')) {
        fn()
      }
    } else {
      this.$apply(fn)
    }
  }

  $rootScope.weeks = [-5, -4, -3, -2, -1, 0, 1].map(function (delta) {
    var date = moment().add('days', 7 * delta)
    var weekNum = date.isoWeek()
    var pad = ''
    if (weekNum < 10) {
      pad = '0'
    }
    var week = {
      yearWeek: date.year() + pad + weekNum,
      year: date.year(),
      week: date.isoWeek(),
      delta: delta,
      projects: {},
      users: {}
    }
    return week
  })

  $rootScope.weekSelect = function (index) {
    $rootScope.activeWeek = $rootScope.weeks[index]
  }

  $rootScope.activeWeek = $rootScope.weeks.slice(-2)[0]

  $rootScope.$watch('activeWeek', function (activeWeek) {
    activeWeek.projects = week.getProjects(activeWeek.yearWeek)
    activeWeek.users = week.getUsers(activeWeek.yearWeek)
  }, true)
})
