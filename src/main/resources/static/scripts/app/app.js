"use strict";
angular.module('dtrackApp', [])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    });
