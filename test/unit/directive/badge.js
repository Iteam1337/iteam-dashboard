describe('badge', function () {

  var $compile, $templateCache, outerScope, scope, element;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function ($rootScope, _$compile_, _$templateCache_) {
      outerScope = $rootScope.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    });

    $templateCache.put('directive/badge/badge.html', '<div></div>');
    element = $compile('<badge></badge>')(outerScope);
    outerScope.$digest();
    scope = element.isolateScope();
  });

  it('should have tests');
  
});