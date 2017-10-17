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

    vm.onInit = onInit;
    vm.getVideo = getVideo;
    vm.getVideos = getVideos;

    function onInit() {
      vm.getVideo(AuthService.getSessionId(), $stateParams.id);
    }

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

    function getVideos(sessionId, skip, limit) {
      VideoService.getVideos(sessionId, skip, limit)
        .then(function(response) {
          vm.videos = vm.videos.concat(response.data.data);
        })
        .catch(function() {
          toastr.error(null, 'Could not load videos.');
        })
      ;
    }
  }
})();
