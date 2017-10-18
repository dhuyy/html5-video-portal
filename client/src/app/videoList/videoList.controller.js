/* eslint no-undef: 0, angular/document-service: 0 */
(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('VideoListController', VideoListController);

  /** @ngInject */
  function VideoListController($timeout, $state, toastr, AuthService, VideoService) {
    var vm = this;

    var NUMBER_VIDEOS_TO_LOAD = 10;
    var SHOULD_INIT_SCROLLMONITOR = true;

    vm.videos = [];
    vm.showSpinner = false;

    vm.onInit = onInit;
    vm.getVideos = getVideos;

    /**
     * This method runs at template initialization and loads the first videos.
     */
    function onInit() {
      vm.getVideos(AuthService.getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
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
          toastr.error(null, 'Could not load videos.');

          $state.go('login')
        })
      ;
    }

    /**
     * This method initializes and configures the "scrollMonitor" module to allow loading videos as the user scroll down
     * the page (lazy loading feature).
     */
    function initScrollMonitor() {
      scrollMonitor
        .create(document.getElementById('video-list-end'))
        .enterViewport(function() {
          if (vm.videos.length < 101) {
            vm.showSpinner = true;
            vm.getVideos(AuthService.getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
          }
        })
      ;
    }
  }
})();
