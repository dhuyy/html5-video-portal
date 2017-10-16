(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        permission: 'private'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        permission: 'public'
      })
      .state('videoDetail', {
        url: '/videoDetail',
        templateUrl: 'app/detail/detail.html',
        controller: 'DetailController',
        controllerAs: 'vm',
        permission: 'private'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
