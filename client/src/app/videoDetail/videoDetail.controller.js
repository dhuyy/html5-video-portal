(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('VideoDetailController', VideoDetailController);

  /** @ngInject */
  function VideoDetailController($stateParams, localStorageService, VideoService) {
    var vm = this;

    vm.video = null;

    vm.onInit = onInit;

    function onInit() {
      getVideo(getSessionId(), $stateParams.id);
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

    function getSessionId() {
      return localStorageService.get('sessionId');
    }
  }
})();
