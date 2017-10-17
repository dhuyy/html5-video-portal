(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .run(runBlock);

  /** @ngInject */
  function runBlock($state, $rootScope, Toastr, localStorageService, AuthService) {
    /*
     * Session management (check if session is still valid)
     */
    var onStateChangeSuccess = $rootScope.$on('$stateChangeSuccess',
      function(event, toState) {
        if (toState.permission === 'private') {
          if (!localStorageService.get('sessionId')) {
            $state.go('login');

            Toastr.error(null, 'Not authorized. Try to sign in again.');
          }
        }
      })
    ;
    $rootScope.$on('$destroy', onStateChangeSuccess);

    /*
    * Check if sessionId exists
     */
    $rootScope.isLogged = function() {
      return !!localStorageService.get('sessionId');
    };

    $rootScope.$on('logout', function() {
      AuthService.logout(AuthService.getSessionId())
        .then(function() {
          localStorageService.remove('sessionId');

          $state.go('login');
        })
      ;
    })
  }

})();
