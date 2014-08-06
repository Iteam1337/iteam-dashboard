describe('ProjectCtrl', function () {

  var scope;
  var ctrl;
  var week;
  

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
    
     
      week = {
        getProjects: sinon.stub(),
        getYearWeek: sinon.stub().returns('201432')
      };
     
      ctrl = $controller('ProjectCtrl', {
        $scope: scope,
        week: week
      });
    });
  });

  describe('#ctor', function () {
    it('gets the projects for the week', function () {
      expect(week.getProjects).calledOnce
        .calledWith('201432');
    });
    xit('it needs more tests');
  });
});