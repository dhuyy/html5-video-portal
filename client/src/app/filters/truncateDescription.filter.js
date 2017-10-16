(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .filter('truncateDescription', truncateDescription);

  function truncateDescription() {
    return function(input) {
      return input.substring(0, 85).concat('...');
    };
  }

})();
