(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .directive('crossoverNavbar', crossoverNavbar);

  /** @ngInject */
  function crossoverNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {

      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController() {
      var vm = this;


    }
  }

})();
