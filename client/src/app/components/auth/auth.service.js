(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .factory('AuthService', AuthService);

  /** @ngInject */
  function AuthService($http, md5, SERVER, localStorageService) {
    var factory = {
      auth: auth,
      logout: logout,
      getSessionId: getSessionId
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

    function getSessionId() {
      return localStorageService.get('sessionId');
    }
  }
})();
