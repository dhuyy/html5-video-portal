(function() {
  'use strict';

  /** @ngInject */
  var videoPlayer = {
    bindings: {
      title: '@'
    },
    controller: function () {

    },
    templateUrl: 'app/components/videoPlayer/videoPlayer.html'
  };

  angular
    .module('crossoverAssignment')
    .component('videoPlayer', videoPlayer);

})();
