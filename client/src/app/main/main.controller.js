(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, localStorageService, AuthService) {
    $scope.$on('logout', function() {
      AuthService.logout()
        .success(function() {
          localStorageService.remove('sessionId');

          $state.go('login');
        })
        .error(function() {
          // TODO create error callback
        })
      ;
    })
  }
})();
