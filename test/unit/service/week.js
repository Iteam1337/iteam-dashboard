describe('week', function () {

  var week;
  var resource;
  var httpBackend;

  beforeEach(function () {
    resource = {
      planned: sinon.stub(),
      reported: sinon.stub()
    };
    $resource = sinon.stub().returns(resource);

    module('iteam-dashboard');
    inject(function (_week_) {
      
      week = _week_;
    });
  });
 

  describe('#getProjects', function () {
    it('returns the projects in a week', function () {
      var result = week.getProjects('201432');
      expect(result).to.be.an('object');
    });
    xit('it needs more tests');
  });

});