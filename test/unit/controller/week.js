describe('WeekCtrl', function () {

  var scope;
  var ctrl;
  var clock;
  var state;

  beforeEach(function () {
    state = {
      go: sinon.spy()
    };
    clock = sinon.useFakeTimers(0, 'Date');
    module('iteam-dashboard');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('WeekCtrl', {
        $scope: scope,
        $state: state
      });
    });
  });

  afterEach(function () {
    clock.restore();
  });

  describe('#ctor', function () {
    it('sets the weeks array', function () {
      expect(scope.weeks).to.be.instanceof(Array);
      expect(scope.weeks[5]).to.eql({
        yearWeek: '19701',
        year: 1970,
        week: 1,
        delta: 0,
        projects: {},
        users: {}
      });
    });
    it('sets the activeWeek', function () {
      expect(scope.activeWeek).to.eql({
        yearWeek: '19701',
        year: 1970,
        week: 1,
        delta: 0,
        projects: {},
        users: {}
      });
    });
  });

  describe('#goTo', function () {
    it('navigates to the parameter state', function () {
      scope.goTo('foo');
      expect(state.go)
        .calledOnce
        .calledWith('foo');
    });
  });

  describe('#weekSelect', function () {
    it('sets the active week having the given index', function () {
      scope.weekSelect(6);
      expect(scope.activeWeek).to.eql({
        yearWeek: '19702',
        year: 1970,
        week: 2,
        delta: 1,
        projects: {},
        users: {}
      });
    });
  });

  describe('activeWeek $watch', function () {});
});