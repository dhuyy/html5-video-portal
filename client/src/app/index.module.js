(function() {
  'use strict';

  angular
    .module('crossoverAssignment', [
      'ngAnimate',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ui.router',
      'toastr'
    ]);

  setTimeout(function() {
    angular.bootstrap(document, ['crossoverAssignment']);
  }, 2000);

})();
