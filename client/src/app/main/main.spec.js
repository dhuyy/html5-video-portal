(function() {
  'use strict';

  /**
   * Unit testing MainController
   */
  describe('[MainController]', function() {
    var AuthService, $scope, $q, $rootScope, $controller, $state, logoutMethodDeferred, localStorageService;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_AuthService_, _$q_, _$rootScope_, _$controller_, _$state_, _localStorageService_) {
      AuthService = _AuthService_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $scope = _$rootScope_.$new();
      $state = _$state_;
      localStorageService = _localStorageService_;

      logoutMethodDeferred = $q.defer();
      spyOn(AuthService, 'logout').and.returnValue(logoutMethodDeferred.promise);
      $controller = _$controller_('MainController', {
        $scope: $scope,
        AuthService: AuthService
      })
    }));

    it('should ensure that AuthService.logout is called when MainController.logout is invoked', function() {
      $controller.logout();
      expect(AuthService.logout).toHaveBeenCalled();
    });

    it('should remove sessionId from LocalStorage and redirect to /login when AuthService.logout promise is resolved',
      function() {
      $controller.logout();

      logoutMethodDeferred.resolve({
        data: {
          status: 'success'
        }
      });

      $rootScope.$digest();

      expect(localStorageService.get('sessionId')).toEqual(null);
      expect($state.current.url).toEqual('/login');
    });

    it('should $on("logout") call vm.logout() when $broadcast("logout") is fired', function() {
      spyOn($controller, 'logout');

      $rootScope.$broadcast('logout');

      expect($controller.logout).toHaveBeenCalled();
    });

  });
})();
