(function() {
  'use strict';

  /**
   * Unit testing loadingScreen component
   */
  describe('[LoadingScreen Component]', function() {
    var $rootScope, $scope, $controller, $element, $animate;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function($compile, _$rootScope_, _$animate_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $animate = _$animate_;

      $element = angular.element('<div class="loading-screen"></div>');

      $compile($element)($scope);
      $rootScope.$digest();

      $controller = $element.controller('loadingScreen');
    }));

    it('should be compiled', function() {
      expect($element.html()).not.toEqual(null);
    });

    it('should call $animate.enabled function on initialization', function() {
      spyOn($animate, 'enabled');

      expect($animate.enabled).toHaveBeenCalled();
    });

  });
})();
