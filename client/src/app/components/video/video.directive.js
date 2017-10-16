/* eslint no-unused-vars: 0 */
(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .directive('crossoverVideo', crossoverVideo);

  /** @ngInject */
  function crossoverVideo(SERVER) {
    return {
      restrict: 'E',
      bindToController: {
        videoId: '<',
        name: '<',
        description: '<',
        url: '<',
        ratings: '<'
      },
      scope: {},
      controller: function($scope) {
        var $ctrl = this;

        function average(array) {
          var sum = array.reduce(function(total, num) {
            return total + num;
          });

          return sum / array.length;
        }

        function round(value, step) {
          step || (step = 1.0);
          var inv = 1.0 / step;

          return Math.round(value * inv) / inv;
        }

        function setVideoRating() {
          $scope.averageRate =
            round(average($ctrl.ratings), 0.5);
        }

        function setVideoUrl() {
          $ctrl.url = SERVER.ADDRESS.concat('/', $ctrl.url);
        }

        $ctrl.onInit = function() {
          setVideoRating();
          setVideoUrl();
        }
      },
      controllerAs: '$ctrl',
      templateUrl: 'app/components/video/video.html',
      link: function(scope, el, attrs, ctrl) {
        function onPlayVideo() {
          var video = angular.element(el).find('video');

          video.on('play', function() {

            angular.forEach(angular.element('.video-el'),
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
