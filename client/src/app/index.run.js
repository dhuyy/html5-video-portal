(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .run(runBlock);

  /** @ngInject */
  function runBlock($state, $rootScope, localStorageService, AuthService) {
    /*
     * Session management (check if session is still valid)
     */
    var onStateChangeSuccess = $rootScope.$on('$stateChangeSuccess',
      function(event, toState) {
        if (toState.permission === 'private') {
          if (!localStorageService.get('sessionId')) {
            $state.go('login');
          }
        }
      })
    ;
    $rootScope.$on('$destroy', onStateChangeSuccess);

    /*
    * Check if sessionId exists
     */
    $rootScope.isLogged = function() {
      return AuthService.isLogged();
    }
  }

})();
