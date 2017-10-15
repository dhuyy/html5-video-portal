(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .factory('AuthService', AuthService);

  /** @ngInject */
  function AuthService($http, md5, SERVER, localStorageService) {
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

    function logout() {
      return $http({
        method: 'GET',
        url: SERVER.ADDRESS + '/user/auth',
        headers: {
          'Content-Type': 'application/json'
        },
        params: { sessionId: localStorageService.get('sessionId') }
      })
    }
  }
})();
