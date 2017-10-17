(function() {
  'use strict';

  /** @ngInject */
  var videoPlayer = {
    bindings: {
      videoId: '@',
      name: '@',
      description: '@',
      url: '<'
    },
    controller: function (SERVER) {
      this.$onChanges = function () {
        this.url = SERVER.ADDRESS.concat('/', this.url);
      }
    },
    templateUrl: 'app/components/videoPlayer/videoPlayer.html'
  };

  angular
    .module('crossoverAssignment')
    .component('videoPlayer', videoPlayer);

})();
