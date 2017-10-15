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
        .then(function(response) {
          localStorageService.set('sessionId', response.data.sessionId);

          $state.go('main');
        })
        .catch(function() {
          // TODO create error callback
        })
      ;
    }

  }
})();
