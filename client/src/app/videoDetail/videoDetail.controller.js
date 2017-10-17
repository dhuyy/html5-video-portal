(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('VideoDetailController', VideoDetailController);

  /** @ngInject */
  function VideoDetailController($scope, $state, $stateParams, localStorageService, VideoService) {
    var vm = this;

    var NUMBER_VIDEOS_TO_LOAD = 5;

    vm.video = null;
    vm.videos = [];

    vm.onInit = onInit;
    vm.getVideo = getVideo;
    vm.getVideos = getVideos;

    $scope.$on('onClickVideo', function(event, args) {
      $state.go('videoDetail', { 'id': args });
    });

    function onInit() {
      vm.getVideo(getSessionId(), $stateParams.id);
      vm.getVideos(getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
    }

    function getVideo(sessionId, videoId) {
      VideoService.getVideo(sessionId, videoId)
        .then(function(response) {
          vm.video = response.data.data;
        })
        .catch(function() {
          // TODO create error callback
        })
      ;
    }

    function getVideos(sessionId, skip, limit) {
      VideoService.getVideos(sessionId, skip, limit)
        .then(function(response) {
          vm.videos = vm.videos.concat(response.data.data);
        })
        .catch(function() {
          $state.go('login');
        })
      ;
    }

    function getSessionId() {
      return localStorageService.get('sessionId');
    }
  }
})();
