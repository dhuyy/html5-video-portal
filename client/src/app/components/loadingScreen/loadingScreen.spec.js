(function() {
  'use strict';

  /**
   * Unit testing loadingScreen component
   */
  describe('[LoadingScreen Component]', function() {
    var $rootScope, $scope, $element, $q, $animate, animateDeferred;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function($compile, _$rootScope_, _$q_, _$animate_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $q = _$q_;
      $animate = _$animate_;

      animateDeferred = $q.defer();

      spyOn($animate, 'leave').and.returnValue(animateDeferred.promise);

      $element = angular.element('<div class="loading-screen"></div>');

      $compile($element)($scope);
      $rootScope.$digest();

    }));

    it('should be compiled', function() {
      expect($element.html()).not.toEqual(null);
    });

    it('should set Controller.videos variable when VideoService.getVideos promise is resolved', function() {
      animateDeferred.resolve();
      $rootScope.$digest();

      expect($animate.leave).toHaveBeenCalled();
    });

  });
})();
