describe('user', function () {

  var user;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function (_user_) {
      user = _user_;
    });
  });

  xit('should have tests', function () {
    //expect(user.doSomething()).to.equal('something');
  });

});