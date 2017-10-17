/* eslint no-unused-vars: 0 */
(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .directive('loadingScreen', loadingScreen);

  /** @ngInject */
  function loadingScreen($animate) {
    var directive = {
      restrict: 'C',
      link: function(scope, element, attributes) {
        $animate.enabled(true);
        $animate.leave(element.children().eq(0)).then( function() {
          element.remove();
          scope = element = attributes = null;
          $animate.enabled(false);
        });
      }
    };

    return directive;
  }

})();
