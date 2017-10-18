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

        video.on('play', function() {
          angular.forEach(angular.element('video'),
            function(current) {
              if (video.get(0).id != current.id)
                current.pause();
            });
        });
      };

      this.$onChanges = function () {
        this.url = SERVER.ADDRESS.concat('/', this.url);
      };

      this.onRatingClick = function() {
        if ($scope.videoRating == 0)
          $scope.videoRating = previousRate;

        previousRate = $scope.videoRating;

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
