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
    controller: function ($scope, $element, $rootScope, SERVER) {
      var previousRate = null;

      this.$onInit = function() {
        var video = angular.element($element).find('video');

        /**
         * This listener runs when a video starts to play and pauses all others from the page.
         */
        video.on('play', function() {
          angular.forEach(angular.element('video'),
            function(current) {
              if (video.get(0).id != current.id)
                current.pause();
            });
        });
      };

      this.$onChanges = function () {
        /**
         * Concatenation of the the server address with the video path.
         * @type {string}
         */
        this.url = SERVER.ADDRESS.concat('/', this.url);
      };

      /**
       * This method makes sure that "videoRating" parameter will not be 0.
       */
      this.onRatingClick = function() {
        if ($scope.videoRating == 0)
          $scope.videoRating = previousRate;

        previousRate = $scope.videoRating;

        /**
         * This code triggers the event "onRatingClick" passing "videoId" and "rating" as parameters.
         */
        $rootScope.$emit('onRatingClick', {
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
