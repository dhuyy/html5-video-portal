(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;

    // Set prefix to avoid overwriting any local storage variables
    localStorageServiceProvider.setPrefix('crossOver');

    // Disable using cookies as default if localStorage is not supported
    localStorageServiceProvider.setDefaultToCookie(false);
  }

})();
