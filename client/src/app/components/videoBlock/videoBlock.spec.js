(function() {
  'use strict';

  /**
   * Unit testing videoBlock directive
   */
  describe('[VideoBlock Directive]', function() {
    var $rootScope, $scope, $controller, $element;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_$rootScope_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      $scope.video = {
        _id: '59e5969a9d5e2bb2a440351c',
        name: '[1] GOOGLE CARDBOARD ASSEMBLY',
        description: 'Google Cardboard Assembly Step by Step Instructions [HD]',
        url: '/videos/Google_Cardboard_Assembly.mp4',
        ratings: [5, 5, 5, 3, 2, 1, 6, 3]
      };
    }));
    beforeEach(inject(function($compile) {
      $element = angular.element('<video-block video-id="{{ video._id }}" name="{{ video.name }}" ' +
        'description="{{ video.description }}" url="video.url" ratings="video.ratings"></video-block>');

      $compile($element)($scope);
      $scope.$digest();

      // Grab controller instance
      $controller = $element.controller('videoBlock');
    }));

    it('should be compiled', function() {
      expect($element.html()).not.toEqual(null);
    });

    it('should Controller.average return the average of an array of numbers', function() {
      var result;
      var array = [2, 6, 7, 2, 7, 9];

      result = $controller.average(array);

      expect(result).toBe(5.5);
    });

    it('should Controller.round return the roundoff number to nearest 0.5', function() {
      var result;

      result = $controller.round(2.74, 0.5);

      expect(result).toBe(2.5);
    });

    it('should emit onClickVideo event when call onClickLogout function', function() {
      spyOn($rootScope, '$emit');

      $controller.goToVideoDetail();

      expect($rootScope.$emit).toHaveBeenCalledWith('onClickDetailVideo', jasmine.any(String));
    });

  });
})();
