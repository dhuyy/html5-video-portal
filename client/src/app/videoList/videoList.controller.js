(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('VideoListController', VideoListController);

  /** @ngInject */
  function VideoListController($scope, $timeout, $state, Toastr, AuthService, VideoService) {
    var vm = this;

    var NUMBER_VIDEOS_TO_LOAD = 10;
    var SHOULD_INIT_SCROLLMONITOR = true;

    vm.videos = [];
    vm.showSpinner = false;

    vm.onInit = onInit;
    vm.getVideos = getVideos;

    function onInit() {
      vm.getVideos(AuthService.getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
    }

    $scope.$on('onClickVideo', function(event, args) {
      $state.go('videoDetail', { 'id': args });
    });

    function getVideos(sessionId, skip, limit) {
      VideoService.getVideos(sessionId, skip, limit)
        .then(function(response) {
          vm.videos = vm.videos.concat(response.data.data);

          vm.showSpinner = false;

          if (SHOULD_INIT_SCROLLMONITOR) {
            $timeout(function() {
              initScrollMonitor();
            });

            SHOULD_INIT_SCROLLMONITOR = false;
          }
        })
        .catch(function() {
          Toastr.error(null, 'Could not load videos.');

          $state.go('login')
        })
      ;
    }

    function initScrollMonitor() {
      scrollMonitor
        .create(document.getElementById('video-list-end'))
        .enterViewport(function() {
          if (vm.videos.length < 101)
            vm.showSpinner = true;
            vm.getVideos(AuthService.getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
        })
      ;
    }
  }
})();
