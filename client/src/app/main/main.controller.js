(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, localStorageService, AuthService) {
    var vm = this;

    vm.logout = logout;

    $scope.$on('logout', function() {
      vm.logout();
    });

    function logout() {
      AuthService.logout(localStorageService.get('sessionId'))
        .then(function() {
          localStorageService.remove('sessionId');

          $state.go('login');
        })
        .catch(function() {
          // TODO create error callback
        })
      ;
    }
  }
})();
