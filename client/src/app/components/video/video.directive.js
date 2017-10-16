(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .directive('crossoverVideo', crossoverVideo);

  /** @ngInject */
  function crossoverVideo(SERVER) {
    return {
      restrict: 'E',
      bindToController: {
        id: '<',
        name: '<',
        description: '<',
        url: '<',
        ratings: '<',
        value: '<'
      },
      scope: {},
      controller: function() {
        this.url = SERVER.ADDRESS.concat('/', this.url);
      },
      controllerAs: '$ctrl',
      templateUrl: 'app/components/video/video.html',
      link: function(scope) {
        scope.averageRate = 3.5;
      }
    }
  }
})();
