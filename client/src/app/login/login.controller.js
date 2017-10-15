(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(LoginService) {
    this.auth = auth;

    function auth(username, password) {
      LoginService.auth(username, password)
        .success(function(response) {
          console.log(response);
        })
        .error(function(error, code) {
          console.log(error, code);
        })
      ;
    }

  }
})();
