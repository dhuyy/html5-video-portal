(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        permission: 'public'
      })
      .state('videoList', {
        url: '/videoList',
        templateUrl: 'app/videoList/videoList.html',
        controller: 'VideoListController',
        controllerAs: 'vm',
        permission: 'private'
      })
      .state('videoDetail', {
        url: '/videoDetail/:id',
        templateUrl: 'app/videoDetail/videoDetail.html',
        controller: 'VideoDetailController',
        controllerAs: 'vm',
        permission: 'private'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
