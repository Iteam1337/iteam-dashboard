describe('week', function () {

  var week;
  var resource;
  var httpBackend;
  var clock;
  var $httpBackend;
  var project;
  var user;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
    resource = {
      planned: sinon.stub(),
      reported: sinon.stub()
    };
    project = {
      getProjects: sinon.stub()
    };
    user = {
      getUsers: sinon.stub()
    };
    $resource = sinon.stub().returns(resource);
    module('iteam-dashboard', function ($provide) {
      $provide.value('project', project);
      $provide.value('user', user);
    });
    inject(function (_week_, _$httpBackend_, $templateCache) {
      week = _week_;
      $httpBackend = _$httpBackend_;
      $templateCache.put('partial/personal/personal.html', '<html></html>');
    });
  });
  
  afterEach(function () {
    clock.restore();
  });
  describe('week', function () {
    describe('#getYearWeek', function () {
      it('returns the current year week if no parameter is passed', function () {
        var result = week.getYearWeek();
        expect(result).to.equal('19701');
      });
    });

    describe('#getProjects', function () {
      it('gets planned and reported hours', function () {
        $httpBackend.expectGET('http://api.iteam.se/week/19701/19701').respond(200);
        $httpBackend.expectGET('http://api.iteam.se/week/-1/19701/reported').respond(200); 
        $httpBackend.expectGET('http://api.iteam.se/week/-1/19701/calendar').respond(200); 
        week.getProjects('19701');
        $httpBackend.flush();
      });
      it('caches the week', function () {
        $httpBackend.expectGET('http://api.iteam.se/week/19701/19701').respond(200, [{}]);
        $httpBackend.expectGET('http://api.iteam.se/week/-1/19701/reported').respond(200, [{}]); 
        $httpBackend.expectGET('http://api.iteam.se/week/-1/19701/calendar').respond(200); 
        week.getProjects('19701');
        week.getProjects('19701');
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
      });
      it('returns the projects in a week', function () {
        var result = week.getProjects('19701');
        expect(result).to.be.an('object');
      });
    }); 
  });
 
});