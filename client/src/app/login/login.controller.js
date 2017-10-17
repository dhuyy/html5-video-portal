(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, AuthService, Toastr, localStorageService) {
    var vm = this;

    vm.auth = auth;

    function auth(username, password) {
      AuthService.auth(username, password)
        .then(function(response) {
          if (response.data.status == 'error') {
            Toastr.error(null, response.data.error);
          } else {
            localStorageService.set('sessionId', response.data.sessionId);

            $state.go('videoList');
          }
        })
        .catch(function() {
          Toastr.error(null, 'Could not connect to server. Try again later.');
        })
      ;
    }

  }
})();
