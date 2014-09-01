describe('MenuCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('MenuCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});