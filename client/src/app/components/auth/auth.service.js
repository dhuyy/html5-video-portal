(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .service('AuthService', AuthService);

  /** @ngInject */
  function AuthService($http, md5, SERVER) {
    var factory = {
      auth: auth,
      logout: logout
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

    function logout(sessionId) {
      return $http({
        method: 'GET',
        url: SERVER.ADDRESS + '/user/logout',
        headers: {
          'Content-Type': 'application/json'
        },
        params: { sessionId: sessionId }
      })
    }
  }
})();
