(function() {
  'use strict';

  angular
    .module('crossoverAssignment')
    .config(config);

  /** @ngInject */
  function config(toastrConfig, localStorageServiceProvider) {
    /**
     * Set prefix to avoid overwriting any local storage variables.
     */
    localStorageServiceProvider.setPrefix('crossOver');

    /**
     * Disable using cookies as default if localStorage is not supported.
     */
    localStorageServiceProvider.setDefaultToCookie(false);

    /**
     * These properties below set the options for the "toastr" notification module.
     */
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 2000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
    toastrConfig.closeButton = true;

  }

})();
