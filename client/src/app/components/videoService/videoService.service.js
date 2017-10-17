(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .factory('VideoService', VideoService);

  /** @ngInject */
  function VideoService($http, SERVER) {
    var factory = {
      getVideos: getVideos,
      getVideo: getVideo,
      rateVideo: rateVideo
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

    function getVideo(sessionId, videoId) {
      return $http({
        method: 'GET',
        url: SERVER.ADDRESS + '/video',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          sessionId: sessionId,
          videoId: videoId
        }
      })
    }

    function rateVideo(sessionId, videoId, rating) {
      return $http({
        method: 'POST',
        url: SERVER.ADDRESS + '/video/ratings',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          sessionId: sessionId
        },
        data: {
          videoId: videoId,
          rating: rating
        }
      })
    }
  }
})();
