(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .factory('VideoService', VideoService);

  /** @ngInject */
  function VideoService($http, SERVER) {
    var factory = {
      getVideos: getVideos
    };
    return factory;

    function getVideos(sessionId, skip, limit) {
      return $http({
        method: 'GET',
        url: SERVER.ADDRESS + '/videos',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          sessionId: sessionId,
          skip: skip,
          limit: limit
        }
      })
    }
  }
})();
