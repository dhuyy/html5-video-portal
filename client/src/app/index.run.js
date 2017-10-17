(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .run(runBlock);

  /** @ngInject */
  function runBlock($state, $rootScope, toastr, localStorageService, AuthService, VideoService) {
    /*
     * Session management (check if session is still valid)
     */
    var onStateChangeSuccess = $rootScope.$on('$stateChangeSuccess',
      function(event, toState) {
        if (toState.permission === 'private') {
          if (!localStorageService.get('sessionId')) {
            $state.go('login');

            toastr.error(null, 'Not authorized. Try to sign in again.');
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

    var onLogout = $rootScope.$on('logout', function() {
      AuthService.logout(AuthService.getSessionId())
        .then(function() {
          localStorageService.remove('sessionId');

          $state.go('login');
        })
      ;
    });
    $rootScope.$on('$destroy', onLogout);

    var onClickDetailVideo = $rootScope.$on('onClickDetailVideo', function(event, args) {
      $state.go('videoDetail', { 'id': args });
    });
    $rootScope.$on('$destroy', onClickDetailVideo);


    var onRatingClick = $rootScope.$on('onRatingClick', function(event, args) {
      VideoService.rateVideo(AuthService.getSessionId(), args.videoId, args.rating)
        .then(function() {
          toastr.success(null, 'Vídeo rated.');
        })
        .catch(function() {
          toastr.error(null, 'Could not rate this video.');
        })
      ;
    });
    $rootScope.$on('$destroy', onRatingClick);
  }

})();
