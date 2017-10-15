(function() {
  'use strict';

  /** @ngInject */
  var crossoverNavbar = {
    bindings: {
      isLogged: '<'
    },
    controller: function ($rootScope) {
      function onClickLogout() {
        $rootScope.$broadcast('logout');
      }

      this.onClickLogout = onClickLogout;
    },
    templateUrl: 'app/components/navbar/navbar.html'
  };

  angular
    .module('crossoverAssignment')
    .component('crossoverNavbar', crossoverNavbar);

})();
