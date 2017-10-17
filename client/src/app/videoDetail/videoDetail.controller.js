(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('VideoDetailController', VideoDetailController);

  /** @ngInject */
  function VideoDetailController($scope, $state, $stateParams, localStorageService, VideoService, AuthService) {
    var vm = this;

    var NUMBER_VIDEOS_TO_LOAD = 5;

    vm.video = null;
    vm.videos = [];

    vm.onInit = onInit;
    vm.getVideo = getVideo;
    vm.getVideos = getVideos;
    vm.rateVideo = rateVideo;

    $scope.$on('onClickVideo', function(event, args) {
      $state.go('videoDetail', { 'id': args });
    });

    $scope.$on('onRatingClick', function(event, args) {
      vm.rateVideo(AuthService.getSessionId(), args.videoId, args.rating);
    });

    function onInit() {
      vm.getVideo(AuthService.getSessionId(), $stateParams.id);
      vm.getVideos(AuthService.getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
    }

    function getVideo(sessionId, videoId) {
      VideoService.getVideo(sessionId, videoId)
        .then(function(response) {
          vm.video = response.data.data;
        })
        .catch(function() {
          $state.go('videoList');
        })
      ;
    }

    function getVideos(sessionId, skip, limit) {
      VideoService.getVideos(sessionId, skip, limit)
        .then(function(response) {
          vm.videos = vm.videos.concat(response.data.data);
        })
        .catch(function() {
          $state.go('videoList');
        })
      ;
    }

    function rateVideo(sessionId, videoId, rating) {
      VideoService.rateVideo(sessionId, videoId, rating)
        .then(function() {
          // TODO create success callback
        })
        .catch(function() {
          // TODO create error callback
        })
      ;
    }
  }
})();
