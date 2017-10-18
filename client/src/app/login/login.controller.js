(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, AuthService, toastr, localStorageService) {
    var vm = this;

    vm.auth = auth;

    /**
     * This method requests the server to authenticate a user based on the "username" and "password" params.
     * @param username
     * @param password
     */
    function auth(username, password) {
      AuthService.auth(username, password)
        .then(function(response) {
          if (response.data.status == 'error') {
            toastr.error(null, response.data.error);
          } else {
            localStorageService.set('sessionId', response.data.sessionId);

            $state.go('videoList');
          }
        })
        .catch(function() {
          toastr.error(null, 'Could not connect to server. Try again later.');
        })
      ;
    }

  }
})();
