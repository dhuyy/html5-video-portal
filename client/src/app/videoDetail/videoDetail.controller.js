/* eslint angular/on-watch: 0 */
(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('VideoDetailController', VideoDetailController);

  /** @ngInject */
  function VideoDetailController($stateParams, toastr, VideoService, AuthService) {
    var vm = this;

    var NUMBER_VIDEOS_TO_LOAD = 5;

    vm.video = null;
    vm.videos = [];
    vm.results = [];

    vm.onInit = onInit;
    vm.getVideo = getVideo;
    vm.getVideos = getVideos;
    vm.showMoreSideVideos = showMoreSideVideos;

    /**
     * This method runs at template initialization and loads the current video based on the "id" url param.
     */
    function onInit() {
      vm.getVideo(AuthService.getSessionId(), $stateParams.id);
    }

    /**
     * This method accesses the server to load one video based on the videoId param.
     * @param sessionId
     * @param videoId
     */
    function getVideo(sessionId, videoId) {
      VideoService.getVideo(sessionId, videoId)
        .then(function(response) {
          vm.video = response.data.data;

          vm.getVideos(AuthService.getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
        })
        .catch(function() {
          toastr.error(null, 'Could not load video '.concat(videoId, '.'));
        })
      ;
    }

    /**
     * This method accesses the server to load a set of videos based on the "skip" and "limit" params.
     * @param sessionId
     * @param skip
     * @param limit
     */
    function getVideos(sessionId, skip, limit) {
      VideoService.getVideos(sessionId, skip, limit)
        .then(function(response) {
          var data = response.data.data;

          vm.videos = vm.videos.concat(data);

          data = data.filter(function(element) {
            return element._id != vm.video._id;
          });

          vm.results = vm.results.concat(data);
        })
        .catch(function() {
          toastr.error(null, 'Could not load videos.');
        })
      ;
    }

    /**
     * This method triggers when the user clicks the "Show More" button and accesses the "getVideos" method to load
     * more videos from the server.
     */
    function showMoreSideVideos() {
      vm.getVideos(AuthService.getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
    }
  }
})();
