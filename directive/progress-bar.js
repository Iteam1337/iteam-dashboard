angular.module('iteam-dashboard').directive('progressBar', function (colors) {
  'use strict';

  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
      key: '@',
      max: '=',
      shade: '@'
    },
    link: function (scope, element) {
      if (!scope.ngModel || !scope.ngModel.user) {
        return;
      }
      var model = scope.ngModel;
      var value = model[scope.key];
      var width = ((value / scope.max) * 100) + '%';
      var shade = scope.shade ? parseFloat(scope.shade) : false;
      var color = colors.getColor(model.user);
      element.css({
        'background-color': shade ? colors.shade(color, shade) : color,
        'width': width
      });
    }
  };
});