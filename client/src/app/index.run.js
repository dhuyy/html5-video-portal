(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .run(runBlock);

  /** @ngInject */
  function runBlock($state, $rootScope, toastr, localStorageService, AuthService, VideoService) {
    /*
    * All the "$on" calls here is assigned to a variable, in order to be destroyed during the $destroy event.
    */

    /*
     * This method is triggered when a state changes and checks for routes that are private. If there is no sessionId
     * stored in the local storage the user is redirected to the Log In page.
     */
    var onStateChangeSuccess = $rootScope.$on('$stateChangeSuccess',
      function(event, toState) {
        if ((toState.permission === 'private') && (!localStorageService.get('sessionId'))) {
          $state.go('login');

          toastr.error(null, 'Not authorized. Try to sign in again.');
        }
      })
    ;
    $rootScope.$on('$destroy', onStateChangeSuccess);

    /*
    * This method returns whether there is a sessionId in local storage.
     */
    $rootScope.isLogged = function() {
      return !!localStorageService.get('sessionId');
    };

    /*
    * This method requests the log out to the server. Removing the sessionId from local storage and redirecting to
    * the login page.
    */
    var onLogout = $rootScope.$on('logout', function() {
      AuthService.logout(AuthService.getSessionId())
        .then(function() {
          localStorageService.remove('sessionId');

          $state.go('login');
        })
      ;
    });
    $rootScope.$on('$destroy', onLogout);

    /*
    * This method executes when the "onClickDetailVideo" event is fired and redirects to the video detail page by
    * passing the video id as parameter.
    */
    var onClickDetailVideo = $rootScope.$on('onClickDetailVideo', function(event, args) {
      $state.go('videoDetail', { 'id': args });
    });
    $rootScope.$on('$destroy', onClickDetailVideo);

    /*
    * This method executes when the "onRatingClick" event is triggered and requests the server to evaluate the video
    * passed as parameter.
    */
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
