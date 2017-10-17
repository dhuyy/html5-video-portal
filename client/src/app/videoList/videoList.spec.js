(function() {
  'use strict';

  /**
   * Unit testing VideoListController
   */
  describe('[VideoListController]', function() {
    var AuthService, VideoService, $scope, $q, $rootScope, $controller, logoutDeferred, getVideosDeferred;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_AuthService_, _VideoService_, _$q_, _$rootScope_, _$controller_) {

      AuthService = _AuthService_;
      VideoService = _VideoService_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $scope = _$rootScope_.$new();

      logoutDeferred = $q.defer();
      getVideosDeferred = $q.defer();

      spyOn(AuthService, 'logout').and.returnValue(logoutDeferred.promise);
      spyOn(VideoService, 'getVideos').and.returnValue(getVideosDeferred.promise);

      $controller = _$controller_('VideoListController', {
        $scope: $scope,
        AuthService: AuthService,
        VideoService: VideoService
      })
    }));

    it('should invoke VideoListController.getVideos when VideoListController.onInit is invoked', function() {
      spyOn($controller, 'getVideos');

      $controller.onInit();

      expect($controller.getVideos).toHaveBeenCalled();
    });

    // it('should ensure that AuthService.logout is called when VideoListController.logout is invoked', function() {
    //   $controller.logout();
    //   expect(AuthService.logout).toHaveBeenCalled();
    // });

    it('should ensure that VideoService.getVideos is called when VideoListController.getVideos is invoked', function() {
      $controller.getVideos();
      expect(VideoService.getVideos).toHaveBeenCalled();
    });

    // it('should remove sessionId from LocalStorage and redirect to /login when AuthService.logout promise is resolved',
    //   function() {
    //   $controller.logout();
    //
    //   logoutDeferred.resolve({
    //     data: {
    //       status: 'success'
    //     }
    //   });
    //
    //   $rootScope.$digest();
    //
    //   expect(localStorageService.get('sessionId')).toEqual(null);
    //   expect($state.current.url).toEqual('/login');
    // });

    it('should set VideoListController.videos variable when VideoService.getVideos promise is resolved',
      function() {
      $controller.getVideos();

      getVideosDeferred.resolve({
        data: {
          status: 'success',
          data: []
        }
      });

      $rootScope.$digest();

      expect($controller.videos).toEqual(jasmine.any(Array));
    });

    // it('should $on("logout") call vm.logout() when $broadcast("logout") is fired', function() {
    //   spyOn($controller, 'logout');
    //
    //   $rootScope.$broadcast('logout');
    //
    //   expect($controller.logout).toHaveBeenCalled();
    // });

  });
})();
