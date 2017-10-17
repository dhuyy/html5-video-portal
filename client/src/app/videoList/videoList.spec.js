(function() {
  'use strict';

  /**
   * Unit testing VideoListController
   */
  describe('[VideoListController]', function() {
    var AuthService, VideoService, toastr, $scope, $q, $rootScope, $controller, logoutDeferred, getVideosDeferred;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_AuthService_, _VideoService_, _$q_, _$rootScope_, _$controller_, _toastr_) {

      AuthService = _AuthService_;
      VideoService = _VideoService_;
      toastr = _toastr_;
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

    it('should invoke Controller.getVideos when Controller.onInit is invoked', function() {
      spyOn($controller, 'getVideos');

      $controller.onInit();

      expect($controller.getVideos).toHaveBeenCalled();
    });

    it('should ensure that VideoService.getVideos is called when Controller.getVideos is invoked', function() {
      $controller.getVideos();
      expect(VideoService.getVideos).toHaveBeenCalled();
    });

    it('should set Controller.videos variable when VideoService.getVideos promise is resolved', function() {
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

    it('should show a error toastr when VideoService.getVideos promise is rejected', function() {
      $controller.getVideos();
      spyOn(toastr, 'error');

      getVideosDeferred.reject();

      $rootScope.$digest();

      expect(toastr.error).toHaveBeenCalled();
    });

  });
})();
