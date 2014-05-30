describe('week', function () {

  var week;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function (_week_) {
      week = _week_;
    });
  });

  xit('should have tests', function () {
    //expect(week.doSomething()).to.equal('something');
  });

});