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
    controller: function ($scope, SERVER) {
      this.$onChanges = function () {
        this.url = SERVER.ADDRESS.concat('/', this.url);
      };

      this.onRatingClick = function() {
        $scope.$emit('onRatingClick', {
          videoId: this.videoId,
          rating: $scope.videoRating
        });
      }
    },
    templateUrl: 'app/components/videoPlayer/videoPlayer.html'
  };

  angular
    .module('crossoverAssignment')
    .component('videoPlayer', videoPlayer);

})();
