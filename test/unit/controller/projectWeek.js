describe('ProjectWeekCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('ProjectWeekCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});