(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .factory('LoginService', LoginService);

  /** @ngInject */
  function LoginService($http, md5, SERVER) {
    var factory = {
      auth: auth
    };
    return factory;

    function auth(username, password) {
      return $http({
        method: 'POST',
        url: SERVER.ADDRESS + '/user/auth',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: username,
          password: md5.createHash(password)
        }
      })
    }
  }
})();
