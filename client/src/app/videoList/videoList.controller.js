(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('VideoListController', VideoListController);

  /** @ngInject */
  function VideoListController($scope, $timeout, $state, localStorageService, AuthService, VideoService) {
    var vm = this;

    var NUMBER_VIDEOS_TO_LOAD = 10;
    var SHOULD_INIT_SCROLLMONITOR = true;

    vm.videos = [];
    vm.showSpinner = false;

    vm.onInit = onInit;
    vm.logout = logout;
    vm.getVideos = getVideos;

    function onInit() {
      vm.getVideos(getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
    }

    $scope.$on('onClickVideo', function(event, args) {
      $state.go('videoDetail', { 'id': args });
    });

    $scope.$on('logout', function() {
      vm.logout();
    });

    function logout() {
      AuthService.logout(getSessionId())
        .then(function() {
          localStorageService.remove('sessionId');

          $state.go('login');
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

          vm.showSpinner = false;

          if (SHOULD_INIT_SCROLLMONITOR) {
            $timeout(function() {
              initScrollMonitor();
            });

            SHOULD_INIT_SCROLLMONITOR = false;
          }
        })
        .catch(function() {
          $state.go('login');
        })
      ;
    }

    function getSessionId() {
      return localStorageService.get('sessionId');
    }

    function initScrollMonitor() {
      scrollMonitor
        .create(document.getElementById('video-list-end'))
        .enterViewport(function() {
          if (vm.videos.length < 101)
            vm.showSpinner = true;
            vm.getVideos(getSessionId(), vm.videos.length, NUMBER_VIDEOS_TO_LOAD);
        })
      ;
    }
  }
})();
