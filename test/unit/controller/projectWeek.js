describe('ProjectWeekCtrl', function () {

  var scope;
  var ctrl;
  var clock;
  var week;
  var project;
  var promise;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      clock = sinon.useFakeTimers();
      promise = {
        then: sinon.spy()
      };
      week = {
        getWeekHours: sinon.stub().returns({
          $promise: promise
        })
      };
      project = {
        getProjects: sinon.stub().returns([{
          name: 'foo'
        }, {
          name: 'bar'
        }])
      };
      ctrl = $controller('ProjectWeekCtrl', {
        $scope: scope,
        week: week,
        project: project
      });
    });
  });

  afterEach(function () {
    clock.restore();
  });

  describe('#ctor', function () {
    it('sets the current week, next week and previous 5 weeks', function () {
      expect(scope.weeks).to.be.an('Array');
      expect(scope.weeks).to.have.length(7);
      expect(scope.weeks[5].toString()).to.equal('19701');
      expect(scope.weeks[6].toString()).to.equal('19702');
      expect(scope.weeks[0].toString()).to.equal('196948');
    });
    it('gets the week hours for the current week', function () {
      expect(week.getWeekHours).calledOnce;
    });
    it('then gets the projects', function () {
      promise.then.yield();
      expect(project.getProjects).calledOnce;
      expect(scope.projects).to.have.length(2);
      expect(scope.projects[0].name).to.equal('foo');
    });
  });
});