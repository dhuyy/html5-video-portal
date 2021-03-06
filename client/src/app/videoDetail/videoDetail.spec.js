(function() {
  'use strict';

  /**
   * Unit testing VideoListController
   */
  describe('[VideoDetailController]', function() {
    var VideoService, toastr, $scope, $q, $rootScope, $controller, getVideoDeferred, getVideosDeferred,
      rateVideoDeferred;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_VideoService_, _$q_, _$rootScope_, _$controller_, _toastr_) {

      VideoService = _VideoService_;
      toastr = _toastr_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $scope = _$rootScope_.$new();

      getVideoDeferred = $q.defer();
      getVideosDeferred = $q.defer();
      rateVideoDeferred = $q.defer();

      spyOn(VideoService, 'getVideo').and.returnValue(getVideoDeferred.promise);
      spyOn(VideoService, 'getVideos').and.returnValue(getVideosDeferred.promise);
      spyOn(VideoService, 'rateVideo').and.returnValue(rateVideoDeferred.promise);

      $controller = _$controller_('VideoDetailController', {
        $scope: $scope,
        VideoService: VideoService
      })
    }));

    it('should invoke Controller.getVideo when Controller.onInit is invoked', function() {
      spyOn($controller, 'getVideo');

      $controller.onInit();

      expect($controller.getVideo).toHaveBeenCalled();
    });

    it('should set Controller.video variable when VideoService.getVideo promise is resolved', function() {
      $controller.getVideo();

      getVideoDeferred.resolve({
        data: {
          status: 'success',
          data: {}
        }
      });

      $rootScope.$digest();

      expect($controller.video).toEqual(jasmine.any(Object));
    });

    it('should show a error toastr when VideoService.getVideo promise is resolved', function() {
      $controller.getVideo();
      spyOn(toastr, 'error');

      getVideoDeferred.reject();
      $rootScope.$digest();

      expect(toastr.error).toHaveBeenCalled();
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
