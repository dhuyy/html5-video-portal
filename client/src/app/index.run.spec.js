(function() {
  'use strict';

  /**
   * Unit testing run block
   */
  describe('[Run Block]', function() {
    var AuthService, VideoService, $rootScope, localStorageService, $q, logoutDeferred, ratingDeferred, $state, toastr;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_AuthService_, _VideoService_, _toastr_, _$rootScope_, _localStorageService_, _$q_, _$state_) {
      AuthService = _AuthService_;
      VideoService = _VideoService_;
      $rootScope = _$rootScope_;
      localStorageService =_localStorageService_;
      $q = _$q_;
      $state = _$state_;
      toastr = _toastr_;

      logoutDeferred = $q.defer();
      ratingDeferred = $q.defer();

      spyOn(AuthService, 'logout').and.returnValue(logoutDeferred.promise);
      spyOn(VideoService, 'rateVideo').and.returnValue(ratingDeferred.promise);
    }));

    it('should get sessionId from localStorage when isLogged is invoked', function() {
      spyOn(localStorageService, 'get');

      $rootScope.isLogged();

      expect(localStorageService.get).toHaveBeenCalled();
    });

    it('should delete sessionId from localStorage and get redirect to login state when AuthService.logout is resolved',
      function() {
        $rootScope.$emit('logout');

        logoutDeferred.resolve();
        $rootScope.$digest();

        expect(localStorageService.get('sessionId')).toBe(null);
        expect($state.current.name).toEqual('login');
      })
    ;

    it('should show a success toastr when VideoService.rateVideo is resolved', function() {
      spyOn(toastr, 'success');

      $rootScope.$emit('onRatingClick', {
        videoId: '59e5969a9d5e2bb2a440351c',
        rating: 5
      });

      ratingDeferred.resolve();
      $rootScope.$digest();

      expect(toastr.success).toHaveBeenCalled();
    });

    it('should show a success toastr when VideoService.rateVideo is rejected', function() {
      spyOn(toastr, 'error');

      $rootScope.$emit('onRatingClick', {
        videoId: '59e5969a9d5e2bb2a440351c',
        rating: 5
      });

      ratingDeferred.reject();
      $rootScope.$digest();

      expect(toastr.error).toHaveBeenCalled();
    });

  });
})();
