(function() {
  'use strict';

  /**
   * Unit testing crossoverNavbar component
   */
  describe('[CrossoverNavbar Component]', function() {
    var rootScope, scope, controller, element;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function($compile, $rootScope) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      element = angular.element('<crossover-navbar is-logged="isLogged"></crossover-navbar>');

      $compile(element)(scope);
      $rootScope.$digest();

      controller = element.controller('crossoverNavbar');
    }));

    it('should be compiled', function() {
      expect(element.html()).not.toEqual(null);
    });

    it('should show Logout option when is-logged param is truthy', function() {
      scope.isLogged = true;
      scope.$apply();

      var menuItem = element.find('ul.nav > li > a');

      expect(menuItem.text().trim()).toEqual('Logout');
    });

    it('should show Login option when is-logged param is falsy', function() {
      scope.isLogged = false;
      scope.$apply();

      var menuItem = element.find('ul.nav > li > a');

      expect(menuItem.text().trim()).toEqual('Login');
    });

    it('should emit logout event when call onClickLogout function', function() {
      spyOn(rootScope, '$emit');

      controller.onClickLogout();

      expect(rootScope.$emit).toHaveBeenCalledWith('logout');
    });

  });
})();
