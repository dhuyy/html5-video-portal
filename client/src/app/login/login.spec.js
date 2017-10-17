(function() {
  'use strict';

  /**
   * Unit testing LoginController
   */
  describe('[LoginController]', function() {
    var AuthService, $q, $rootScope, $controller, $state, authMethodDeferred, localStorageService, toastr;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_AuthService_, _$q_, _$rootScope_, _$controller_, _$state_, _localStorageService_, _toastr_) {
      AuthService = _AuthService_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      localStorageService = _localStorageService_;
      toastr = _toastr_;

      authMethodDeferred = $q.defer();
      spyOn(AuthService, 'auth').and.returnValue(authMethodDeferred.promise);

      $controller = _$controller_('LoginController', {
        AuthService: AuthService
      })
    }));

    it('should ensure that AuthService.auth is called when LoginController.auth is invoked', function() {
      $controller.auth();
      expect(AuthService.auth).toHaveBeenCalled();
    });

    it('should store sessionId in LocalStorage and redirect to /videoList when AuthService.auth promise is resolved', function() {
      var sessionId = 'XSZ7pv4it1rMaEYK8FWe6oEDvpMSyzuIK';

      $controller.auth();

      authMethodDeferred.resolve({
        data: {
          sessionId: sessionId
        }
      });

      $rootScope.$digest();

      expect(localStorageService.get('sessionId')).toEqual(sessionId);
      expect($state.current.url).toEqual('/videoList');
    });

    it('should show toastr error when AuthService.auth promise is resolved but with an error', function() {
      spyOn(toastr, 'error');

      $controller.auth();

      authMethodDeferred.resolve({
        data: {
          status: 'error'
        }
      });

      $rootScope.$digest();

      expect(toastr.error).toHaveBeenCalled();
    });

  });
})();
