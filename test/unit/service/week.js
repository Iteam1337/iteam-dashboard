describe('week', function () {

  var week;
  var resource;
  var httpBackend;
  var clock;
  var $httpBackend;
  var project;
  var user;

  beforeEach(function () {
    resource = {
      planned: sinon.stub(),
      reported: sinon.stub()
    };
    project = {
      getProjects: sinon.stub()
    };
    user = {

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
 
  describe('week', function () {
    describe('#getYearWeek', function () {
      it('returns the current year week if no parameter is passed', function () {
        clock = sinon.useFakeTimers();
        var result = week.getYearWeek();
        expect(result).to.equal('19701');
        clock.restore();
      });
    });

    describe('#getProjects', function () {
      xit('gets planned and reported hours', function () {
        $httpBackend.expectGET('http://api.iteam.se/week/9999/201432').respond(200);
        $httpBackend.expectGET('http://api.iteam.se/week/9999/201432/reported').respond(200); 
        week.getProjects('201432');
        $httpBackend.flush();
      });
      xit('caches the week', function () {
        $httpBackend.expectGET('http://api.iteam.se/week/9999/201432').respond(200, [{}]);
        $httpBackend.expectGET('http://api.iteam.se/week/9999/201432/reported').respond(200, [{}]); 
        week.getProjects('201432');
        week.getProjects('201432');
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
      });
      it('returns the projects in a week', function () {
        var result = week.getProjects('201432');
        expect(result).to.be.an('object');
      });
    }); 
  });
 
});