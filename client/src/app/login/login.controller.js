(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, AuthService, localStorageService) {
    var vm = this;

    vm.auth = auth;

    function auth(username, password) {
      AuthService.auth(username, password)
        .success(function(response) {
          localStorageService.set('sessionId', response.sessionId);

          $state.go('main');
        })
        .error(function() {
          // TODO create error callback
        })
      ;
    }

  }
})();
