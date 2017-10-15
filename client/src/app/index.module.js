/* eslint angular/timeout-service: 0 */
(function() {
  'use strict';

  angular
    .module('crossoverAssignment', [
      'ngAnimate',
      'ngSanitize',
      'ngMessages',
      'LocalStorageModule',
      'ngAria',
      'ui.router',
      'angular-md5',
      'toastr'
    ]);

  setTimeout(function() {
    angular.bootstrap(document, ['crossoverAssignment']);
  }, 500);

})();
