angular.module('iteam-dashboard').filter('sortByDepartmentName', function () {
  'use strict'

  function toArray (object) {
    if (!(object instanceof Object)) {
      return object
    }
    var array = []
    angular.forEach(object, function (val) {
      array.push(val)
    })
    return array
  }

  function defaultSort (a, b) {
    var first = a.department ? a.department.toLowerCase() : ''
    var second = b.department ? b.department.toLowerCase() : ''
    if (first < second) {
      return -1
    } else if (first > second) {
      return 1
    }
    return 0
  }

  return function (array) {
    if (!array) {
      return []
    }

    if (array instanceof Array === false) {
      array = toArray(array)
    }

    var iteam = []
    var privat = []
    var external = []

    array.forEach(function (project) {
      var department = project.department ? project.department.toLowerCase() : ''
      if (department.indexOf('iteam') > -1) {
        iteam.push(project)
      } else if (!department || department.indexOf('privat') > -1) {
        privat.push(project)
      } else {
        external.push(project)
      }
    })

    iteam.sort(defaultSort)
    privat.sort(defaultSort)
    external.sort(defaultSort)

    return external.concat(iteam).concat(privat)
  }
})
