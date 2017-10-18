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

  /*
  *  This timeout delays the bootstrap of the application in 2 seconds in order to show the loading animation,
  *  simulating the loading of the application on the internet.
  */
  setTimeout(function() {
    angular.bootstrap(document, ['crossoverAssignment']);
  }, 2000);

})();
