/* eslint no-unused-vars: 0 */
(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .directive('videoBlock', videoBlock);

  /** @ngInject */
  function videoBlock(SERVER) {
    return {
      restrict: 'E',
      bindToController: {
        videoId: '@',
        name: '@',
        description: '@',
        url: '<',
        ratings: '<'
      },
      scope: {},
      controller: function($scope, $rootScope) {
        var $ctrl = this;

        $ctrl.average = average;
        $ctrl.round = round;

        /**
         * This method returns the average of an array of numbers.
         * @param array
         * @returns {number}
         */
        function average(array) {
          var sum = array.reduce(function(total, num) {
            return total + num;
          });

          return sum / array.length;
        }

        /**
         * This method rounds a value based on the "step" parameter.
         * @param value
         * @param step
         * @returns {number}
         */
        function round(value, step) {
          step || (step = 1.0);
          var inv = 1.0 / step;

          return Math.round(value * inv) / inv;
        }

        /**
         * This method assigns the "averageRate" variable the value of the "ratings" variable after it has been
         * processed by the "average" and "round" methods.
         */
        function setVideoRating() {
          $scope.averageRate =
            round(average($ctrl.ratings), 0.5);
        }

        /**
         * This method concatenates the server address with the video path.
         */
        function setVideoUrl() {
          $ctrl.url = SERVER.ADDRESS.concat('/', $ctrl.url);
        }

        /**
         * This code triggers the event "onClickDetailVideo" passing "videoId" as parameter.
         */
        $ctrl.goToVideoDetail = function() {
          $rootScope.$emit('onClickDetailVideo', $ctrl.videoId)
        };

        /**
         * This method runs at template initialization and calls "setVideoRating" and "setVideoUrl" methods.
         */
        $ctrl.onInit = function() {
          setVideoRating();
          setVideoUrl();
        }
      },
      controllerAs: '$ctrl',
      templateUrl: 'app/components/videoBlock/videoBlock.html',
      link: function(scope, el) {
        /**
         * This method register a listener to run when a video starts to play and pauses all others from the page.
         */
        function onPlayVideo() {
          var video = angular.element(el).find('video');

          video.on('play', function() {
            angular.forEach(angular.element('video'),
              function(current) {
                if (video.get(0).id != current.id)
                current.pause();
              });
          });
        }

        (function onInit() {
          onPlayVideo()
        })();
      }
    }
  }
})();
