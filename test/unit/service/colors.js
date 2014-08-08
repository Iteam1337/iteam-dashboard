describe('colors', function () {

  var colors;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function (_colors_) {
      colors = _colors_;
    });
  });

  xit('should have tests', function () {
    //expect(colors.doSomething()).to.equal('something');
  });

});