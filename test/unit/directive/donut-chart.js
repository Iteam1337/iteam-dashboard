describe('donutChart', function () {

  var $compile, $templateCache, outerScope, scope, element;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function ($rootScope, _$compile_, _$templateCache_) {
      outerScope = $rootScope.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    });

    $templateCache.put('directive/donut-chart/donut-chart.html', '<div></div>');
    element = $compile('<donut-chart></donut-chart>')(outerScope);
    outerScope.$digest();
    scope = element.isolateScope();
  });

  it('should have tests');

});