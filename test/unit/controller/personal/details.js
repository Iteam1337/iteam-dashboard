describe('PersonalDetailsCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('PersonalDetailsCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});