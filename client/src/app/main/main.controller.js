(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, localStorageService, AuthService, VideoService) {
    var vm = this;

    var CHUNK_VIDEOS_TO_LOAD = 10;

    vm.videos = null;

    vm.onInit = onInit;
    vm.logout = logout;
    vm.getVideos = getVideos;

    function onInit() {
      vm.getVideos(_getSessionId(), 0, CHUNK_VIDEOS_TO_LOAD);
    }

    $scope.$on('logout', function() {
      vm.logout();
    });

    function logout() {
      AuthService.logout(_getSessionId())
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
          vm.videos = response.data.data;
        })
        .catch(function() {
          // TODO create error callback
        })
      ;
    }

    function _getSessionId() {
      return localStorageService.get('sessionId');
    }
  }
})();
