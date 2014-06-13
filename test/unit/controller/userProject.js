describe('UserProjectCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('UserProjectCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});