(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, localStorageService, AuthService) {
    var vm = this;

    $scope.$on('logout', function() {
      AuthService.logout()
        .success(function() {
          localStorageService.remove('sessionId');

          $state.go('login');
        })
        .error(function(error, code) {
          console.log(error, code);
        })
      ;
    })
  }
})();
