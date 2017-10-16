(function() {
  'use strict';

  /** @ngInject */
  var crossoverVideoDetail = {
    bindings: {
      title: '@'
    },
    controller: function () {

    },
    templateUrl: 'app/components/videoDetail/videoDetail.html'
  };

  angular
    .module('crossoverAssignment')
    .component('crossoverVideoDetail', crossoverVideoDetail);

})();
