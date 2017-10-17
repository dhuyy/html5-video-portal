(function() {
  'use strict';

  /** @ngInject */
  var crossoverNavbar = {
    bindings: {
      isLogged: '<'
    },
    controller: function ($scope) {
      function onClickLogout() {
        $scope.$emit('logout');
      }

      this.onClickLogout = onClickLogout;
    },
    templateUrl: 'app/components/navbar/navbar.html'
  };

  angular
    .module('crossoverAssignment')
    .component('crossoverNavbar', crossoverNavbar);

})();
