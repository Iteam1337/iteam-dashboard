describe('sortByDepartmentName', function () {
  var filter

  beforeEach(function () {
    module('iteam-dashboard')
    inject(function ($filter) {
      filter = $filter('sort-by-department-name')
    })
  })

  xit('should have tests', function () {
    expect(filter('input')).to.equal('filter result')
  })

})
