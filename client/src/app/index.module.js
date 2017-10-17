/* eslint angular/timeout-service: 0 */
(function() {
  'use strict';

  angular
    .module('crossoverAssignment', [
      'ngAnimate',
      'ngSanitize',
      'ngMessages',
      'LocalStorageModule',
      'angular-input-stars',
      'ngAria',
      'ui.router',
      'angular-md5',
      'toastr'
    ]);

  setTimeout(function() {
    angular.bootstrap(document, ['crossoverAssignment']);
  }, 2000);

})();
