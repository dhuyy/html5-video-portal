(function() {
  'use strict';

  /**
   * Unit testing crossoverNavbar component
   */
  describe('[VideoPlayer Component]', function() {
    var $rootScope, $scope, $controller, $element;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function($compile, _$rootScope_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      $element = angular.element('<video-player></video-player>');

      $compile($element)($scope);
      $rootScope.$digest();

      $controller = $element.controller('videoPlayer');
    }));

    it('should be compiled', function() {
      expect($element.html()).not.toEqual(null);
    });

    it('should emit onRatingClick event when call onRatingClick function', function() {
      spyOn($rootScope, '$emit');

      $controller.onRatingClick();

      expect($rootScope.$emit).toHaveBeenCalledWith('onRatingClick', jasmine.any(Object));
    });

  });
})();
