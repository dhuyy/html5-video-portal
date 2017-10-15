(function() {
  'use strict';

  angular
    .module('crossoverAssignment', [
      'ngAnimate',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ui.router',
      'angular-md5',
      'toastr'
    ]);

  setTimeout(function() {
    angular.bootstrap(document, ['crossoverAssignment']);
  }, 500);

})();
