(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('VideoDetailController', VideoDetailController);

  /** @ngInject */
  function VideoDetailController($rootScope, $stateParams, Toastr, VideoService, AuthService) {
    var vm = this;

    var NUMBER_VIDEOS_TO_LOAD = 5;

    vm.video = null;
    vm.videos = [];

    vm.onInit = onInit;
    vm.getVideo = getVideo;
    vm.getVideos = getVideos;
    vm.rateVideo = rateVideo;

    $rootScope.$on('onRatingClick', function(event, args) {
      vm.rateVideo(AuthService.getSessionId(), args.videoId, args.rating);
    });

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
          Toastr.error(null, 'Could not load video '.concat(videoId, '.'));
        })
      ;
    }

    function getVideos(sessionId, skip, limit) {
      VideoService.getVideos(sessionId, skip, limit)
        .then(function(response) {
          vm.videos = vm.videos.concat(response.data.data);
        })
        .catch(function() {
          Toastr.error(null, 'Could not load videos.');
        })
      ;
    }

    function rateVideo(sessionId, videoId, rating) {
      VideoService.rateVideo(sessionId, videoId, rating)
        .then(function() {
          Toastr.success(null, 'Vídeo rated.', { 'timeOut': 1500 });
        })
        .catch(function() {
          Toastr.error(null, 'Could not rate this video.');
        })
      ;
    }
  }
})();
