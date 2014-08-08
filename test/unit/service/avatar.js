describe('avatar', function () {

  var avatar;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function (_avatar_) {
      avatar = _avatar_;
    });
  });

  xit('should have tests', function () {
    //expect(avatar.doSomething()).to.equal('something');
  });

});