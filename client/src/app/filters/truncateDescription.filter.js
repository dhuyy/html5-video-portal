(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .filter('truncateDescription', truncateDescription);

  /**
   * This filter crops the string parameter to 85 characters and adds the string "..." to the end.
   * @returns {Function}
   */
  function truncateDescription() {
    return function(input) {
      return input.substring(0, 85).concat('...');
    };
  }

})();
